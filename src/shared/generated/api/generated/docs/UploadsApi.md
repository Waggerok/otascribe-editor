# UploadsApi

All URIs are relative to */dev/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**couldUploadApiUploadsCouldUploadPost**](#coulduploadapiuploadscoulduploadpost) | **POST** /api/uploads/could_upload | Could Upload|
|[**uploadFileApiUploadsUploadFilePost**](#uploadfileapiuploadsuploadfilepost) | **POST** /api/uploads/upload_file | Upload File|

# **couldUploadApiUploadsCouldUploadPost**
> any couldUploadApiUploadsCouldUploadPost(fileMetaInformationRequest)

Check if a file could be uploaded

### Example

```typescript
import {
    UploadsApi,
    Configuration,
    FileMetaInformationRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new UploadsApi(configuration);

let fileMetaInformationRequest: FileMetaInformationRequest; //

const { status, data } = await apiInstance.couldUploadApiUploadsCouldUploadPost(
    fileMetaInformationRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **fileMetaInformationRequest** | **FileMetaInformationRequest**|  | |


### Return type

**any**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**413** | Request Entity Too Large |  -  |
|**415** | Unsupported Media Type |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **uploadFileApiUploadsUploadFilePost**
> OtaProject uploadFileApiUploadsUploadFilePost()


### Example

```typescript
import {
    UploadsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UploadsApi(configuration);

let file: File; // (default to undefined)

const { status, data } = await apiInstance.uploadFileApiUploadsUploadFilePost(
    file
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **file** | [**File**] |  | defaults to undefined|


### Return type

**OtaProject**

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

