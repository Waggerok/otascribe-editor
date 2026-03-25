# LicenseInfoApi

All URIs are relative to */dev/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getLicenseInfoApiLicenseGet**](#getlicenseinfoapilicenseget) | **GET** /api/license/ | Get License Info|

# **getLicenseInfoApiLicenseGet**
> LicenseInfoResponse getLicenseInfoApiLicenseGet()


### Example

```typescript
import {
    LicenseInfoApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LicenseInfoApi(configuration);

const { status, data } = await apiInstance.getLicenseInfoApiLicenseGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**LicenseInfoResponse**

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

