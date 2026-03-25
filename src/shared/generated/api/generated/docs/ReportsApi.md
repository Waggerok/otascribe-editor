# ReportsApi

All URIs are relative to */dev/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**generateReportApiReportsGenerateReportPost**](#generatereportapireportsgeneratereportpost) | **POST** /api/reports/generate_report | Generate Report|

# **generateReportApiReportsGenerateReportPost**
> any generateReportApiReportsGenerateReportPost(generateReportRequest)


### Example

```typescript
import {
    ReportsApi,
    Configuration,
    GenerateReportRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ReportsApi(configuration);

let generateReportRequest: GenerateReportRequest; //

const { status, data } = await apiInstance.generateReportApiReportsGenerateReportPost(
    generateReportRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **generateReportRequest** | **GenerateReportRequest**|  | |


### Return type

**any**

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

