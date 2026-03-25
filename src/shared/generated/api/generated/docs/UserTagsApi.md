# UserTagsApi

All URIs are relative to */dev/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createUserTagApiUserTagsPut**](#createusertagapiusertagsput) | **PUT** /api/user_tags/ | Create User Tag|
|[**deleteUserTagApiUserTagsTagIdDelete**](#deleteusertagapiusertagstagiddelete) | **DELETE** /api/user_tags/{tag_id} | Delete User Tag|
|[**getUserTagsApiUserTagsGet**](#getusertagsapiusertagsget) | **GET** /api/user_tags/ | Get User Tags|
|[**updateUserTagApiUserTagsTagIdPost**](#updateusertagapiusertagstagidpost) | **POST** /api/user_tags/{tag_id} | Update User Tag|

# **createUserTagApiUserTagsPut**
> UserTagResponse createUserTagApiUserTagsPut(createUserTagRequest)


### Example

```typescript
import {
    UserTagsApi,
    Configuration,
    CreateUserTagRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new UserTagsApi(configuration);

let createUserTagRequest: CreateUserTagRequest; //

const { status, data } = await apiInstance.createUserTagApiUserTagsPut(
    createUserTagRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createUserTagRequest** | **CreateUserTagRequest**|  | |


### Return type

**UserTagResponse**

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

# **deleteUserTagApiUserTagsTagIdDelete**
> BaseStatusResponse deleteUserTagApiUserTagsTagIdDelete()


### Example

```typescript
import {
    UserTagsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserTagsApi(configuration);

let tagId: number; // (default to undefined)

const { status, data } = await apiInstance.deleteUserTagApiUserTagsTagIdDelete(
    tagId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **tagId** | [**number**] |  | defaults to undefined|


### Return type

**BaseStatusResponse**

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

# **getUserTagsApiUserTagsGet**
> Array<UserTagResponse> getUserTagsApiUserTagsGet()


### Example

```typescript
import {
    UserTagsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserTagsApi(configuration);

const { status, data } = await apiInstance.getUserTagsApiUserTagsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<UserTagResponse>**

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

# **updateUserTagApiUserTagsTagIdPost**
> UserTagResponse updateUserTagApiUserTagsTagIdPost(updateUserTagRequest)


### Example

```typescript
import {
    UserTagsApi,
    Configuration,
    UpdateUserTagRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new UserTagsApi(configuration);

let tagId: number; // (default to undefined)
let updateUserTagRequest: UpdateUserTagRequest; //

const { status, data } = await apiInstance.updateUserTagApiUserTagsTagIdPost(
    tagId,
    updateUserTagRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateUserTagRequest** | **UpdateUserTagRequest**|  | |
| **tagId** | [**number**] |  | defaults to undefined|


### Return type

**UserTagResponse**

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

