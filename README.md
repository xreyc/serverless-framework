# Serverless Framework AWS NodeJS

This is a backend application based on serverless framework.
The purpose of this project is to design event driven architecture

## Specification

### Infrastructure Architecture

```mermaid
graph TD;
    Client-->ApiGateway;
    ApiGateway-->LambdaAPIHandlers;
    LambdaAPIHandlers-->DynamoDB;
    LambdaAPIHandlers-->S3Bucket1;
    LambdaAPIHandlers-->S3Bucket2;
    LambdaAPIHandlers-->ApiLogs;
    S3Bucket1-->SNS;
    SNS-->Topic1;
    SNS-->Topic2;
    SNS-->Topic3;
    Topic1-->SQS;
    SQS-->LambdaBackgroudProcess;
    LambdaBackgroudProcess-->S3Bucket3;
    LambdaBackgroudProcess-->DynamoDBDataWarehouse;
    Topic2-->SQS;
    SQS2-->LambdaBackgroudProcess2;
    LambdaBackgroudProcess2-->S3Bucket4;
    LambdaBackgroudProcess2-->DynamoDBDataWarehouse;
```

### Technologies

| Topic                            | Technology    |
| -------------------------------- | ------------- |
| Framework                        | Serverless    |
| Authentication and Authorization | Cognito       |
| Authentication and Authorization | Lambda        |
| Database                         | Lambda        |
| Storage                          | S3            |
| Notification                     | SNS           |
| Queuing                          | SQS           |

## Deployments

### Environments

| Environments   |
| -------------- |
| dev            |
| test           |
| production     |

### Database

First navigate to app/infrastructure/cognito

```
$ serverless deploy -s <environment>
```

### Storage

First navigate to app/infrastructure/storage

```
$ serverless deploy -s <environment>
```

### API

First navigate to app/api

```
$ serverless deploy -s <environment>
```