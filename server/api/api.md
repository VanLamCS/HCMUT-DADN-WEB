# The server provides the API endpoints:

-   [ Login API ](#login-api)

-   [ Get The Latest Temperature API ](#get-the-latest-temperature-api)

-   [ Get The Latest Humidity API ](#get-the-latest-humidity-api-api)

-   [ Get The Latest Soild Moisture API ](#get-the-latest-soild-moisture-api)

-   [ Get The Latest Fan Status API ](#get-the-latest-fan-status-api)

-   [ Get The Latest Mode Status API ](#get-the-latest-mode-status-api)

-   [ Get The Latest Pump Status API ](#get-the-latest-pump-status-api)

-   [ Get The Latest Light Status API ](#get-the-latest-light-status-api)

-   [ Get Temperature Dataset API ](#get-temperature-dataset-api)

-   [ Get Humiditiy Dataset API ](#get-humiditiy-dataset-api)

-   [ Get Soild Moisture Dataset API ](#get-soild-moisture-dataset-api)

-   [ Set Fan Data API ](#set-fan-data-api)

-   [ Set Mode Data API ](#set-mode-data-api)

-   [ Set Pump Data API ](#set-pump-data-api)

-   [ Set Light Data API ](#set-light-data-api)

And some socket messages below:

-   `temperatureUpdate`,
-   `humidityUpdate`,
-   `soildMoistureUpdate`,
-   `fanUpdate`,
-   `pumpUpdate`,
-   `modeUpdate`,
-   `lightUpdate`,
-   `newNotification`

# Login API

This endpoint is used to log in a user and receive a session token.

## Request

`POST api/user/login`

### Request Header

| Header       | Description                          |
| ------------ | ------------------------------------ |
| Content-Type | Required. Set to `application/json`. |

### Request Body

| Property | Type   | Description                         |
| -------- | ------ | ----------------------------------- |
| email    | string | Required. The username of the user. |
| password | string | Required. The password of the user. |

### Example

```json
{
    "email": "vanlamcs@vanlam.com",
    "password": "secretPassword"
}
```

## Response

### Successful Response

#### HTTP Status Code

| Status Code | Description           |
| ----------- | --------------------- |
| 200         | OK. Login successful. |

#### Response Body

| Property | Data type | Description   |
| -------- | --------- | ------------- |
| \_id     | string    | User ID.      |
| name     | string    | Name.         |
| email    | string    | Email.        |
| avatar   | string    | Avatar URL.   |
| token    | string    | Access token. |

#### Example

```json
{
    HTTP/1.1 200 OK
    "_id": "63fa0de6bc0cfe32d5705230",
    "name": "Le Van Lam",
    "email": "vanlam@gmail.com",
    "avatar": "Images url",
    "token": "access token :<<"
}
```

### Response Failed

#### HTTP Status Code

| Status Code | Description                |
| ----------- | -------------------------- |
| 400         | Bad Request. Login failed. |

#### Response Body

| Property | Data type | Description    |
| -------- | --------- | -------------- |
| message  | string    | Error message. |

#### Example

```json
{
    HTTP/1.1 400 Bad Request
    "message": "Invalid email or password"
}
```

# Get The Latest Temperature API

This API endpoint retrieves the latest temperature data.

## Request

`GET api/data/lasttemperature`

### Request Header

| Header        | Description                               |
| ------------- | ----------------------------------------- |
| Content-Type  | Required. Set to `application/json`.      |
| Authorization | Required. Set to `Bearer <access token>`. |

## Response

### Successful Response

#### HTTP Status Code

| Status Code | Description     |
| ----------- | --------------- |
| 200         | OK. Successful. |

#### Response Body

| Property   | Data type | Description                               |
| ---------- | --------- | ----------------------------------------- |
| message    | string    | `successful`.                             |
| feed_key   | string    | `temperature`.                            |
| value      | string    | Latest temperature value.                 |
| created_at | string    | The time it was created. ISO Date Format. |

#### Example

```json
{
    HTTP/1.1 200 OK
    "id": "0F8Q4720CM3QKRDBZCRA52H7RC",
    "feed_id": 2446726,
    "value": "29",
    "location": null,
    "created_at": "2023-03-19T15:16:40Z",
    "updated_at": "2023-03-19T15:16:40Z",
    "expiration": "1681831000.0",
    "lat": null,
    "lon": null,
    "ele": null,
    "feed_key": "temperature",
    "message": "successful"
}
```

# Get The Latest Humidity API

This API endpoint retrieves the latest humidity data.

## Request

`GET api/data/lasthumidity`

### Request Header

| Header        | Description                               |
| ------------- | ----------------------------------------- |
| Content-Type  | Required. Set to `application/json`.      |
| Authorization | Required. Set to `Bearer <access token>`. |

## Response

### Successful Response

#### HTTP Status Code

| Status Code | Description     |
| ----------- | --------------- |
| 200         | OK. Successful. |

#### Response Body

| Property   | Data type | Description                               |
| ---------- | --------- | ----------------------------------------- |
| message    | string    | `successful`.                             |
| feed_key   | string    | `humidity`.                               |
| value      | string    | Latest humidity value.                    |
| created_at | string    | The time it was created. ISO Date Format. |

#### Example

```json
{
    HTTP/1.1 200 OK
    "id": "0F8Q46RW97WTE31GWF28KWJ0M3",
    "feed_id": 2447171,
    "value": "65",
    "location": null,
    "created_at": "2023-03-19T15:16:11Z",
    "updated_at": "2023-03-19T15:16:11Z",
    "expiration": "1681830971.0",
    "lat": null,
    "lon": null,
    "ele": null,
    "feed_key": "humidity",
    "message": "successful"
}
```

# Get The Latest Soild Moisture API

This API endpoint retrieves the latest soild-moisture data.

## Request

`GET api/data/lastsoildmoisture`

### Request Header

| Header        | Description                               |
| ------------- | ----------------------------------------- |
| Content-Type  | Required. Set to `application/json`.      |
| Authorization | Required. Set to `Bearer <access token>`. |

## Response

### Successful Response

#### HTTP Status Code

| Status Code | Description     |
| ----------- | --------------- |
| 200         | OK. Successful. |

#### Response Body

| Property   | Data type | Description                               |
| ---------- | --------- | ----------------------------------------- |
| message    | string    | `successful`.                             |
| feed_key   | string    | `soild-moisture`.                         |
| value      | string    | Latest soild-moisture value.              |
| created_at | string    | The time it was created. ISO Date Format. |

#### Example

```json
{
    HTTP/1.1 200 OK
    "id": "0F8Q4780H8NSBDEFF7JP9VPVZ0",
    "feed_id": 2447174,
    "value": "3.223444",
    "location": null,
    "created_at": "2023-03-19T15:17:00Z",
    "updated_at": "2023-03-19T15:17:00Z",
    "expiration": "1681831020.0",
    "lat": null,
    "lon": null,
    "ele": null,
    "feed_key": "soild-moisture",
    "message": "successful"
}
```

# Get The Latest Fan Status API

This API endpoint retrieves the latest fan status.

## Request

`GET api/data/lastfan`

### Request Header

| Header        | Description                               |
| ------------- | ----------------------------------------- |
| Content-Type  | Required. Set to `application/json`.      |
| Authorization | Required. Set to `Bearer <access token>`. |

## Response

### Successful Response

#### HTTP Status Code

| Status Code | Description     |
| ----------- | --------------- |
| 200         | OK. Successful. |

#### Response Body

| Property   | Data type | Description                               |
| ---------- | --------- | ----------------------------------------- |
| message    | string    | `successful`.                             |
| feed_key   | string    | `fan`.                                    |
| value      | string    | Latest fan status. "0" is off, "1" is on. |
| created_at | string    | The time it was created. ISO Date Format. |

#### Example

```json
{
    HTTP/1.1 200 OK
    "id": "0F8PXHVDHFZ0PT9WWC793C30S0",
    "feed_id": 2447170,
    "value": "1",
    "location": null,
    "created_at": "2023-03-19T09:04:04Z",
    "updated_at": "2023-03-19T09:04:04Z",
    "expiration": "1681808644.0",
    "lat": null,
    "lon": null,
    "ele": null,
    "feed_key": "fan",
    "message": "successful"
}
```

# Get The Latest Mode Status APIs

This API endpoint retrieves the latest mode status.

## Request

`GET api/data/lastmode`

### Request Header

| Header        | Description                               |
| ------------- | ----------------------------------------- |
| Content-Type  | Required. Set to `application/json`.      |
| Authorization | Required. Set to `Bearer <access token>`. |

## Response

### Successful Response

#### HTTP Status Code

| Status Code | Description     |
| ----------- | --------------- |
| 200         | OK. Successful. |

#### Response Body

| Property   | Data type | Description                                     |
| ---------- | --------- | ----------------------------------------------- |
| message    | string    | `successful`.                                   |
| feed_key   | string    | `mode`.                                         |
| value      | string    | Latest mode status. "0" is manual, "1" is auto. |
| created_at | string    | The time it was created. ISO Date Format.       |

#### Example

```json
{
    HTTP/1.1 200 OK
    "id": "0F8PXHVDHFZ0PT9WWC793C30S0",
    "feed_id": 2447170,
    "value": "1",
    "location": null,
    "created_at": "2023-03-19T09:04:04Z",
    "updated_at": "2023-03-19T09:04:04Z",
    "expiration": "1681808644.0",
    "lat": null,
    "lon": null,
    "ele": null,
    "feed_key": "mode",
    "message": "successful"
}
```

# Get The Latest Pump Status API

This API endpoint retrieves the latest pump status.

## Request

`GET api/data/lastpump`

### Request Header

| Header        | Description                               |
| ------------- | ----------------------------------------- |
| Content-Type  | Required. Set to `application/json`.      |
| Authorization | Required. Set to `Bearer <access token>`. |

## Response

### Successful Response

#### HTTP Status Code

| Status Code | Description     |
| ----------- | --------------- |
| 200         | OK. Successful. |

#### Response Body

| Property   | Data type | Description                                |
| ---------- | --------- | ------------------------------------------ |
| message    | string    | `successful`.                              |
| feed_key   | string    | `pump`.                                    |
| value      | string    | Latest pump status. "0" is off, "1" is on. |
| created_at | string    | The time it was created. ISO Date Format.  |

#### Example

```json
{
    HTTP/1.1 200 OK
    "id": "0F8PXHVDHFZ0PT9WWC793C30S0",
    "feed_id": 2447170,
    "value": "1",
    "location": null,
    "created_at": "2023-03-19T09:04:04Z",
    "updated_at": "2023-03-19T09:04:04Z",
    "expiration": "1681808644.0",
    "lat": null,
    "lon": null,
    "ele": null,
    "feed_key": "pump",
    "message": "successful"
}
```

# Get The Latest Light Status API

This API endpoint retrieves the latest light status.

## Request

`GET api/data/lastlight`

### Request Header

| Header        | Description                               |
| ------------- | ----------------------------------------- |
| Content-Type  | Required. Set to `application/json`.      |
| Authorization | Required. Set to `Bearer <access token>`. |

## Response

### Successful Response

#### HTTP Status Code

| Status Code | Description     |
| ----------- | --------------- |
| 200         | OK. Successful. |

#### Response Body

| Property   | Data type | Description                                 |
| ---------- | --------- | ------------------------------------------- |
| message    | string    | `successful`.                               |
| feed_key   | string    | `light`.                                    |
| value      | string    | Latest light status. "0" is off, "1" is on. |
| created_at | string    | The time it was created. ISO Date Format.   |

#### Example

```json
{
    HTTP/1.1 200 OK
    "id": "0F8PXHVDHFZ0PT9WWC793C30S0",
    "feed_id": 2447170,
    "value": "1",
    "location": null,
    "created_at": "2023-03-19T09:04:04Z",
    "updated_at": "2023-03-19T09:04:04Z",
    "expiration": "1681808644.0",
    "lat": null,
    "lon": null,
    "ele": null,
    "feed_key": "light",
    "message": "successful"
}
```

# Get Temperature Dataset API

This endpoint is used to get temperature dataset.

## Request

`GET api/data/temperatures`

### Request Header

| Header        | Description                               |
| ------------- | ----------------------------------------- |
| Authorization | Required. Set to `Bearer <access token>`. |

| Param      | Description                                  |
| ---------- | -------------------------------------------- |
| start_time | Optional. `ISO Date Format` of start time.   |
| end_time   | Optional. `ISO Date Format` of end time.     |
| hours      | Optional. Number hours from now need to get. |

### Example

`api/data/temperatures?start_time=2023-02-18T17:00:00.000Z&end_time=2023-03-18T17:00:00.000Z`

## Response

### Successful Response

#### HTTP Status Code

| Status Code | Description     |
| ----------- | --------------- |
| 200         | OK. Successful. |

#### Response Body

| Property   | Data type | Description                 |
| ---------- | --------- | --------------------------- |
| feed       | object    | Feed information.           |
| parameters | object    | -                           |
| columns    | array     | Columns.                    |
| data       | array     | Array contains arrays data. |

#### Example

```json
{
    HTTP/1.1 200 OK
    "feed": {
        "id": 2446726,
        "name": "temperature",
        "key": "temperature"
    },
    "parameters": {
        "start_time": "2023-02-18T17:00:00Z",
        "end_time": "2023-03-18T17:00:00Z",
        "resolution": 5,
        "hours": 672,
        "field": "avg"
    },
    "columns": [
        "date",
        "value"
    ],
    "storage": "agg",
    "data": [
        [
        "2023-02-25T15:50:00Z",
        "31.0"
        ],
        [
        "2023-02-25T17:20:00Z",
        "32.0"
        ]
    ]
}
```

# Get Humiditiy Dataset API

This endpoint is used to get humidity dataset.

## Request

`GET api/data/humidities`

### Request Header

| Header        | Description                               |
| ------------- | ----------------------------------------- |
| Authorization | Required. Set to `Bearer <access token>`. |

| Param      | Description                                  |
| ---------- | -------------------------------------------- |
| start_time | Optional. `ISO Date Format` of start time.   |
| end_time   | Optional. `ISO Date Format` of end time.     |
| hours      | Optional. Number hours from now need to get. |

### Example

`api/data/humidities?start_time=2023-02-18T17:00:00.000Z&end_time=2023-03-18T17:00:00.000Z`

## Response

### Successful Response

#### HTTP Status Code

| Status Code | Description     |
| ----------- | --------------- |
| 200         | OK. Successful. |

#### Response Body

| Property   | Data type | Description                 |
| ---------- | --------- | --------------------------- |
| feed       | object    | Feed information.           |
| parameters | object    | -                           |
| columns    | array     | Columns.                    |
| data       | array     | Array contains arrays data. |

#### Example

```json
{
    HTTP/1.1 200 OK
    "feed": {
        "id": 2446726,
        "name": "humidity",
        "key": "humidity"
    },
    "parameters": {
        "start_time": "2023-02-18T17:00:00Z",
        "end_time": "2023-03-18T17:00:00Z",
        "resolution": 5,
        "hours": 672,
        "field": "avg"
    },
    "columns": [
        "date",
        "value"
    ],
    "storage": "agg",
    "data": [
        [
        "2023-02-25T15:50:00Z",
        "31.0"
        ],
        [
        "2023-02-25T17:20:00Z",
        "32.0"
        ]
    ]
}
```

# Get Soild Moisture Dataset API

This endpoint is used to get soild-moisture dataset.

## Request

`GET api/data/soildmoistures`

### Request Header

| Header        | Description                               |
| ------------- | ----------------------------------------- |
| Authorization | Required. Set to `Bearer <access token>`. |

| Param      | Description                                  |
| ---------- | -------------------------------------------- |
| start_time | Optional. `ISO Date Format` of start time.   |
| end_time   | Optional. `ISO Date Format` of end time.     |
| hours      | Optional. Number hours from now need to get. |

### Example

`api/data/soildmoistures?start_time=2023-02-18T17:00:00.000Z&end_time=2023-03-18T17:00:00.000Z`

## Response

### Successful Response

#### HTTP Status Code

| Status Code | Description     |
| ----------- | --------------- |
| 200         | OK. Successful. |

#### Response Body

| Property   | Data type | Description                 |
| ---------- | --------- | --------------------------- |
| feed       | object    | Feed information.           |
| parameters | object    | -                           |
| columns    | array     | Columns.                    |
| data       | array     | Array contains arrays data. |

#### Example

```json
{
    HTTP/1.1 200 OK
    "feed": {
        "id": 2446726,
        "name": "soild-moisture",
        "key": "soild-moisture"
    },
    "parameters": {
        "start_time": "2023-02-18T17:00:00Z",
        "end_time": "2023-03-18T17:00:00Z",
        "resolution": 5,
        "hours": 672,
        "field": "avg"
    },
    "columns": [
        "date",
        "value"
    ],
    "storage": "agg",
    "data": [
        [
        "2023-02-25T15:50:00Z",
        "31.0"
        ],
        [
        "2023-02-25T17:20:00Z",
        "32.0"
        ]
    ]
}
```

# Set Fan Data API

This endpoint is used to set fan status.

## Request

`POST api/data/setfan`

### Request Header

| Header        | Description                               |
| ------------- | ----------------------------------------- |
| Content-Type  | Required. Set to `application/json`.      |
| Authorization | Required. Set to `Bearer <access token>`. |

### Request Body

| Property | Type   | Description                                                     |
| -------- | ------ | --------------------------------------------------------------- |
| value    | string | Required. The value set to status of fan. "0" is off, "1" is on |

### Example

```json
{
    "value": "1"
}
```

## Response

### Successful Response

#### HTTP Status Code

| Status Code | Description          |
| ----------- | -------------------- |
| 201         | Created. Successful. |

#### Response Body

| Property | Data type | Description     |
| -------- | --------- | --------------- |
| message  | string    | Just a message. |

#### Example

```json
{
    HTTP/1.1 201 Created
    "message": "Set data successful"
}
```

### Response Failed

#### HTTP Status Code

| Status Code | Description                                              |
| ----------- | -------------------------------------------------------- |
| 400         | Bad Request. `Value is not sent!` or `Value is invalid`. |
| 401         | Unauthorized. Not logged in.                             |
| 403         | Forbidden.                                               |

#### Response Body

| Property | Data type | Description    |
| -------- | --------- | -------------- |
| message  | string    | Error message. |

#### Example

```json
{
    HTTP/1.1 400 Bad Request
    "message": "Value is invalid"
}
```

# Set Mode Data API

This endpoint is used to set mode status.

## Request

`POST api/data/setmode`

### Request Header

| Header        | Description                               |
| ------------- | ----------------------------------------- |
| Content-Type  | Required. Set to `application/json`.      |
| Authorization | Required. Set to `Bearer <access token>`. |

### Request Body

| Property | Type   | Description                                                           |
| -------- | ------ | --------------------------------------------------------------------- |
| value    | string | Required. The value set to status of mode. "0" is manual, "1" is auto |

### Example

```json
{
    "value": "1"
}
```

## Response

### Successful Response

#### HTTP Status Code

| Status Code | Description          |
| ----------- | -------------------- |
| 201         | Created. Successful. |

#### Response Body

| Property | Data type | Description     |
| -------- | --------- | --------------- |
| message  | string    | Just a message. |

#### Example

```json
{
    HTTP/1.1 201 Created
    "message": "Set data successful"
}
```

### Response Failed

#### HTTP Status Code

| Status Code | Description                                              |
| ----------- | -------------------------------------------------------- |
| 400         | Bad Request. `Value is not sent!` or `Value is invalid`. |
| 401         | Unauthorized. Not logged in.                             |
| 403         | Forbidden.                                               |

#### Response Body

| Property | Data type | Description    |
| -------- | --------- | -------------- |
| message  | string    | Error message. |

#### Example

```json
{
    HTTP/1.1 400 Bad Request
    "message": "Value is invalid"
}
```

# Set Pump Data API

This endpoint is used to set pump status.

## Request

`POST api/data/setpump`

### Request Header

| Header        | Description                               |
| ------------- | ----------------------------------------- |
| Content-Type  | Required. Set to `application/json`.      |
| Authorization | Required. Set to `Bearer <access token>`. |

### Request Body

| Property | Type   | Description                                                      |
| -------- | ------ | ---------------------------------------------------------------- |
| value    | string | Required. The value set to status of pump. "0" is off, "1" is on |

### Example

```json
{
    "value": "1"
}
```

## Response

### Successful Response

#### HTTP Status Code

| Status Code | Description          |
| ----------- | -------------------- |
| 201         | Created. Successful. |

#### Response Body

| Property | Data type | Description     |
| -------- | --------- | --------------- |
| message  | string    | Just a message. |

#### Example

```json
{
    HTTP/1.1 201 Created
    "message": "Set data successful"
}
```

### Response Failed

#### HTTP Status Code

| Status Code | Description                                              |
| ----------- | -------------------------------------------------------- |
| 400         | Bad Request. `Value is not sent!` or `Value is invalid`. |
| 401         | Unauthorized. Not logged in.                             |
| 403         | Forbidden.                                               |

#### Response Body

| Property | Data type | Description    |
| -------- | --------- | -------------- |
| message  | string    | Error message. |

#### Example

```json
{
    HTTP/1.1 400 Bad Request
    "message": "Value is invalid"
}
```

# Set Light Data API

This endpoint is used to set light status.

## Request

`POST api/data/setlight`

### Request Header

| Header        | Description                               |
| ------------- | ----------------------------------------- |
| Content-Type  | Required. Set to `application/json`.      |
| Authorization | Required. Set to `Bearer <access token>`. |

### Request Body

| Property | Type   | Description                                                       |
| -------- | ------ | ----------------------------------------------------------------- |
| value    | string | Required. The value set to status of light. "0" is off, "1" is on |

### Example

```json
{
    "value": "1"
}
```

## Response

### Successful Response

#### HTTP Status Code

| Status Code | Description          |
| ----------- | -------------------- |
| 201         | Created. Successful. |

#### Response Body

| Property | Data type | Description     |
| -------- | --------- | --------------- |
| message  | string    | Just a message. |

#### Example

```json
{
    HTTP/1.1 201 Created
    "message": "Set data successful"
}
```

### Response Failed

#### HTTP Status Code

| Status Code | Description                                              |
| ----------- | -------------------------------------------------------- |
| 400         | Bad Request. `Value is not sent!` or `Value is invalid`. |
| 401         | Unauthorized. Not logged in.                             |
| 403         | Forbidden.                                               |

#### Response Body

| Property | Data type | Description    |
| -------- | --------- | -------------- |
| message  | string    | Error message. |

#### Example

```json
{
    HTTP/1.1 400 Bad Request
    "message": "Value is invalid"
}
```
