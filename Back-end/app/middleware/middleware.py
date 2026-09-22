from functools import wraps
from datetime import datetime, timedelta, timezone
from fastapi.responses import JSONResponse
from fastapi import APIRouter, Response, Request


ips_historic = {}
def rate_limit(req_limit:int, time_skip:int):

    def decorator(func):
        @wraps(func)
        async def  wrapper(request:Request, *args, **kwargs):
            ip = request.client.host
            chave = (ip, func.__name__)

            now = datetime.now(timezone.utc)

            if chave not in ips_historic:
                ips_historic[chave] = []

            time_limit = now - timedelta(seconds=time_skip)
            ips_historic[chave] = [
                tempo
                for tempo in ips_historic[chave]
                if tempo > time_limit
            ]
            if len(ips_historic[chave]) >= req_limit:
                older_request = ips_historic[chave][0]

                wait_time = int(
                    (
                        older_request + timedelta(seconds=time_skip) - now
                    ).total_seconds()
                )
                return JSONResponse(
                    status_code=429,
                    content={
                        "message" : "Too many requests",
                        "wait_time" : wait_time
                    }
                )
            ips_historic[chave].append(now)
            return await func(request, *args, **kwargs)
        return wrapper
    return decorator