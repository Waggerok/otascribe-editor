# AuditLogsApi

All URIs are relative to */dev/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getAuditLogsApiAuditLogsGet**](#getauditlogsapiauditlogsget) | **GET** /api/audit_logs/ | Get Audit Logs|

# **getAuditLogsApiAuditLogsGet**
> PaginatedResponseAuditLogResponse getAuditLogsApiAuditLogsGet()


### Example

```typescript
import {
    AuditLogsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuditLogsApi(configuration);

let limit: number; // (optional) (default to 50)
let page: number; // (optional) (default to 1)
let actors: string; // (optional) (default to undefined)
let requestersIps: string; // (optional) (default to undefined)
let functionNames: string; // (optional) (default to undefined)
let levelNames: string; // (optional) (default to undefined)
let currentTimeFrom: string; // (optional) (default to undefined)
let currentTimeTo: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.getAuditLogsApiAuditLogsGet(
    limit,
    page,
    actors,
    requestersIps,
    functionNames,
    levelNames,
    currentTimeFrom,
    currentTimeTo
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **limit** | [**number**] |  | (optional) defaults to 50|
| **page** | [**number**] |  | (optional) defaults to 1|
| **actors** | [**string**] |  | (optional) defaults to undefined|
| **requestersIps** | [**string**] |  | (optional) defaults to undefined|
| **functionNames** | [**string**] |  | (optional) defaults to undefined|
| **levelNames** | [**string**] |  | (optional) defaults to undefined|
| **currentTimeFrom** | [**string**] |  | (optional) defaults to undefined|
| **currentTimeTo** | [**string**] |  | (optional) defaults to undefined|


### Return type

**PaginatedResponseAuditLogResponse**

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

