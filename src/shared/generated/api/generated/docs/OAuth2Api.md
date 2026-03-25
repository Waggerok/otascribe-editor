# OAuth2Api

All URIs are relative to */dev/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createAuthApplicationApiOauth2Put**](#createauthapplicationapioauth2put) | **PUT** /api/oauth2/ | Create Auth Application|
|[**deleteAuthApplicationApiOauth2AppIdDelete**](#deleteauthapplicationapioauth2appiddelete) | **DELETE** /api/oauth2/{app_id} | Delete Auth Application|
|[**getAuthApplicationsApiOauth2Get**](#getauthapplicationsapioauth2get) | **GET** /api/oauth2/ | Get Auth Applications|
|[**getMyAuthApplicationsApiOauth2OwnGet**](#getmyauthapplicationsapioauth2ownget) | **GET** /api/oauth2/own | Get My Auth Applications|
|[**rotateAuthApplicationSecretApiOauth2RotateSecretAppIdPost**](#rotateauthapplicationsecretapioauth2rotatesecretappidpost) | **POST** /api/oauth2/rotate_secret/{app_id} | Rotate Auth Application Secret|

# **createAuthApplicationApiOauth2Put**
> CreateAuthApplicationResponse createAuthApplicationApiOauth2Put(createAuthApplicationRequest)


### Example

```typescript
import {
    OAuth2Api,
    Configuration,
    CreateAuthApplicationRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new OAuth2Api(configuration);

let createAuthApplicationRequest: CreateAuthApplicationRequest; //

const { status, data } = await apiInstance.createAuthApplicationApiOauth2Put(
    createAuthApplicationRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createAuthApplicationRequest** | **CreateAuthApplicationRequest**|  | |


### Return type

**CreateAuthApplicationResponse**

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

# **deleteAuthApplicationApiOauth2AppIdDelete**
> BaseStatusResponse deleteAuthApplicationApiOauth2AppIdDelete()


### Example

```typescript
import {
    OAuth2Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OAuth2Api(configuration);

let appId: string; // (default to undefined)

const { status, data } = await apiInstance.deleteAuthApplicationApiOauth2AppIdDelete(
    appId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **appId** | [**string**] |  | defaults to undefined|


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

# **getAuthApplicationsApiOauth2Get**
> Array<AuthApplicationResponse> getAuthApplicationsApiOauth2Get()


### Example

```typescript
import {
    OAuth2Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OAuth2Api(configuration);

const { status, data } = await apiInstance.getAuthApplicationsApiOauth2Get();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<AuthApplicationResponse>**

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

# **getMyAuthApplicationsApiOauth2OwnGet**
> Array<AuthApplicationResponse> getMyAuthApplicationsApiOauth2OwnGet()


### Example

```typescript
import {
    OAuth2Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OAuth2Api(configuration);

const { status, data } = await apiInstance.getMyAuthApplicationsApiOauth2OwnGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<AuthApplicationResponse>**

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

# **rotateAuthApplicationSecretApiOauth2RotateSecretAppIdPost**
> RotateAuthApplicationSecretResponse rotateAuthApplicationSecretApiOauth2RotateSecretAppIdPost()


### Example

```typescript
import {
    OAuth2Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OAuth2Api(configuration);

let appId: string; // (default to undefined)

const { status, data } = await apiInstance.rotateAuthApplicationSecretApiOauth2RotateSecretAppIdPost(
    appId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **appId** | [**string**] |  | defaults to undefined|


### Return type

**RotateAuthApplicationSecretResponse**

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

