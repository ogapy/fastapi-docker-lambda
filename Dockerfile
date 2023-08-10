# production/Dockerfile
FROM public.ecr.aws/lambda/python:3.10

RUN pip install poetry

COPY poetry.lock pyproject.toml ./

RUN poetry export -f requirements.txt --output requirements.txt \
  && pip install -r requirements.txt

COPY . .

CMD ["app/main.handler"]
