# UserRolesApi

All URIs are relative to */dev/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createRoleEndpointApiUserRolesPut**](#createroleendpointapiuserrolesput) | **PUT** /api/user_roles/ | Create Role Endpoint|
|[**deleteRoleEndpointApiUserRolesRoleIdDelete**](#deleteroleendpointapiuserrolesroleiddelete) | **DELETE** /api/user_roles/{role_id} | Delete Role Endpoint|
|[**getAvailableRolesEndpointApiUserRolesGet**](#getavailablerolesendpointapiuserrolesget) | **GET** /api/user_roles/ | Get Available Roles Endpoint|
|[**updateRoleEndpointApiUserRolesRoleIdPost**](#updateroleendpointapiuserrolesroleidpost) | **POST** /api/user_roles/{role_id} | Update Role Endpoint|

# **createRoleEndpointApiUserRolesPut**
> UserRoleResponse createRoleEndpointApiUserRolesPut(createUserRoleRequest)


### Example

```typescript
import {
    UserRolesApi,
    Configuration,
    CreateUserRoleRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new UserRolesApi(configuration);

let createUserRoleRequest: CreateUserRoleRequest; //

const { status, data } = await apiInstance.createRoleEndpointApiUserRolesPut(
    createUserRoleRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createUserRoleRequest** | **CreateUserRoleRequest**|  | |


### Return type

**UserRoleResponse**

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

# **deleteRoleEndpointApiUserRolesRoleIdDelete**
> BaseStatusResponse deleteRoleEndpointApiUserRolesRoleIdDelete()


### Example

```typescript
import {
    UserRolesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserRolesApi(configuration);

let roleId: number; // (default to undefined)

const { status, data } = await apiInstance.deleteRoleEndpointApiUserRolesRoleIdDelete(
    roleId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **roleId** | [**number**] |  | defaults to undefined|


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

# **getAvailableRolesEndpointApiUserRolesGet**
> Array<UserRoleResponse> getAvailableRolesEndpointApiUserRolesGet()


### Example

```typescript
import {
    UserRolesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserRolesApi(configuration);

const { status, data } = await apiInstance.getAvailableRolesEndpointApiUserRolesGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<UserRoleResponse>**

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

# **updateRoleEndpointApiUserRolesRoleIdPost**
> UserRoleResponse updateRoleEndpointApiUserRolesRoleIdPost(changeUserRoleRequest)


### Example

```typescript
import {
    UserRolesApi,
    Configuration,
    ChangeUserRoleRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new UserRolesApi(configuration);

let roleId: number; // (default to undefined)
let changeUserRoleRequest: ChangeUserRoleRequest; //

const { status, data } = await apiInstance.updateRoleEndpointApiUserRolesRoleIdPost(
    roleId,
    changeUserRoleRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **changeUserRoleRequest** | **ChangeUserRoleRequest**|  | |
| **roleId** | [**number**] |  | defaults to undefined|


### Return type

**UserRoleResponse**

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

