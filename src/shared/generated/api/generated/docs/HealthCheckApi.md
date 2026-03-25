# HealthCheckApi

All URIs are relative to */dev/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getHealthApiHealthGet**](#gethealthapihealthget) | **GET** /api/health/ | Perform a Health Check|

# **getHealthApiHealthGet**
> HealthCheck getHealthApiHealthGet()

## Perform a Health Check Endpoint to perform a healthcheck on. This endpoint can primarily be used Docker to ensure a robust container orchestration and management is in place. Other services which rely on proper functioning of the API service will not deploy if this endpoint returns any other HTTP status code except 200 (OK). Returns:     HealthCheck: Returns a JSON response with the health status

### Example

```typescript
import {
    HealthCheckApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new HealthCheckApi(configuration);

const { status, data } = await apiInstance.getHealthApiHealthGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**HealthCheck**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Return HTTP Status Code 200 (OK) |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

