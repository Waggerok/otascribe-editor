# AuthorizationApi

All URIs are relative to */dev/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getOidcLoginUrlApiAuthOidcGetLoginUrlProviderIdGet**](#getoidcloginurlapiauthoidcgetloginurlprovideridget) | **GET** /api/auth/oidc/get_login_url/{provider_id} | Get Oidc Login Url|
|[**getOidcProvidersApiAuthOidcProvidersGet**](#getoidcprovidersapiauthoidcprovidersget) | **GET** /api/auth/oidc_providers | Get Oidc Providers|
|[**loginForAccessTokenApiAuthLoginPost**](#loginforaccesstokenapiauthloginpost) | **POST** /api/auth/login | Login For Access Token|
|[**oidcLoginByTokenApiAuthOidcLoginByTokenProviderIdGet**](#oidcloginbytokenapiauthoidcloginbytokenprovideridget) | **GET** /api/auth/oidc/login_by_token/{provider_id} | Oidc Login By Token|

# **getOidcLoginUrlApiAuthOidcGetLoginUrlProviderIdGet**
> any getOidcLoginUrlApiAuthOidcGetLoginUrlProviderIdGet()


### Example

```typescript
import {
    AuthorizationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthorizationApi(configuration);

let providerId: string; // (default to undefined)

const { status, data } = await apiInstance.getOidcLoginUrlApiAuthOidcGetLoginUrlProviderIdGet(
    providerId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **providerId** | [**string**] |  | defaults to undefined|


### Return type

**any**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getOidcProvidersApiAuthOidcProvidersGet**
> Array<OidcProviderResponse> getOidcProvidersApiAuthOidcProvidersGet()


### Example

```typescript
import {
    AuthorizationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthorizationApi(configuration);

const { status, data } = await apiInstance.getOidcProvidersApiAuthOidcProvidersGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<OidcProviderResponse>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **loginForAccessTokenApiAuthLoginPost**
> Token loginForAccessTokenApiAuthLoginPost()


### Example

```typescript
import {
    AuthorizationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthorizationApi(configuration);

let userAgent: string; // (default to undefined)
let username: string; // (default to undefined)
let password: string; // (default to undefined)
let grantType: string; // (optional) (default to undefined)
let scope: string; // (optional) (default to '')
let clientId: string; // (optional) (default to undefined)
let clientSecret: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.loginForAccessTokenApiAuthLoginPost(
    userAgent,
    username,
    password,
    grantType,
    scope,
    clientId,
    clientSecret
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userAgent** | [**string**] |  | defaults to undefined|
| **username** | [**string**] |  | defaults to undefined|
| **password** | [**string**] |  | defaults to undefined|
| **grantType** | [**string**] |  | (optional) defaults to undefined|
| **scope** | [**string**] |  | (optional) defaults to ''|
| **clientId** | [**string**] |  | (optional) defaults to undefined|
| **clientSecret** | [**string**] |  | (optional) defaults to undefined|


### Return type

**Token**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/x-www-form-urlencoded
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **oidcLoginByTokenApiAuthOidcLoginByTokenProviderIdGet**
> Token oidcLoginByTokenApiAuthOidcLoginByTokenProviderIdGet()


### Example

```typescript
import {
    AuthorizationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthorizationApi(configuration);

let providerId: string; // (default to undefined)

const { status, data } = await apiInstance.oidcLoginByTokenApiAuthOidcLoginByTokenProviderIdGet(
    providerId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **providerId** | [**string**] |  | defaults to undefined|


### Return type

**Token**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

