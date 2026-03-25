# UsersApi

All URIs are relative to */dev/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**changeEmailApiUsersChangeEmailLoginPost**](#changeemailapiuserschangeemailloginpost) | **POST** /api/users/change_email/{login} | Change Email|
|[**changeSelfEmailApiUsersChangeEmailPost**](#changeselfemailapiuserschangeemailpost) | **POST** /api/users/change_email | Change Self Email|
|[**changeSelfPasswordApiUsersChangePasswordPost**](#changeselfpasswordapiuserschangepasswordpost) | **POST** /api/users/change_password | Change Self Password|
|[**changeSelfProfileInfoApiUsersProfileInfoPost**](#changeselfprofileinfoapiusersprofileinfopost) | **POST** /api/users/profile_info | Change Self Profile Info|
|[**changeUserPasswordApiUsersChangePasswordLoginPost**](#changeuserpasswordapiuserschangepasswordloginpost) | **POST** /api/users/change_password/{login} | Change User Password|
|[**changeUserProfileInfoApiUsersProfileInfoLoginPost**](#changeuserprofileinfoapiusersprofileinfologinpost) | **POST** /api/users/profile_info/{login} | Change User Profile Info|
|[**createNewUserApiUsersPut**](#createnewuserapiusersput) | **PUT** /api/users/ | Create New User|
|[**deleteUserApiUsersLoginDelete**](#deleteuserapiuserslogindelete) | **DELETE** /api/users/{login} | Delete User|
|[**getAllUsersApiUsersGet**](#getallusersapiusersget) | **GET** /api/users/ | Get All Users|
|[**massDeleteUsersApiUsersMassDeleteUsersPost**](#massdeleteusersapiusersmassdeleteuserspost) | **POST** /api/users/mass_delete_users | Mass Delete Users|
|[**whoamiApiUsersWhoamiGet**](#whoamiapiuserswhoamiget) | **GET** /api/users/whoami | Whoami|

# **changeEmailApiUsersChangeEmailLoginPost**
> UserResponse changeEmailApiUsersChangeEmailLoginPost(changeEmailRequest)


### Example

```typescript
import {
    UsersApi,
    Configuration,
    ChangeEmailRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let login: string; // (default to undefined)
let changeEmailRequest: ChangeEmailRequest; //

const { status, data } = await apiInstance.changeEmailApiUsersChangeEmailLoginPost(
    login,
    changeEmailRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **changeEmailRequest** | **ChangeEmailRequest**|  | |
| **login** | [**string**] |  | defaults to undefined|


### Return type

**UserResponse**

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

# **changeSelfEmailApiUsersChangeEmailPost**
> UserResponse changeSelfEmailApiUsersChangeEmailPost(changeEmailRequest)


### Example

```typescript
import {
    UsersApi,
    Configuration,
    ChangeEmailRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let changeEmailRequest: ChangeEmailRequest; //

const { status, data } = await apiInstance.changeSelfEmailApiUsersChangeEmailPost(
    changeEmailRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **changeEmailRequest** | **ChangeEmailRequest**|  | |


### Return type

**UserResponse**

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

# **changeSelfPasswordApiUsersChangePasswordPost**
> UserPasswordResponse changeSelfPasswordApiUsersChangePasswordPost()


### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

const { status, data } = await apiInstance.changeSelfPasswordApiUsersChangePasswordPost();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**UserPasswordResponse**

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

# **changeSelfProfileInfoApiUsersProfileInfoPost**
> UserResponse changeSelfProfileInfoApiUsersProfileInfoPost(changeProfileInfoRequest)


### Example

```typescript
import {
    UsersApi,
    Configuration,
    ChangeProfileInfoRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let changeProfileInfoRequest: ChangeProfileInfoRequest; //

const { status, data } = await apiInstance.changeSelfProfileInfoApiUsersProfileInfoPost(
    changeProfileInfoRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **changeProfileInfoRequest** | **ChangeProfileInfoRequest**|  | |


### Return type

**UserResponse**

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

# **changeUserPasswordApiUsersChangePasswordLoginPost**
> UserPasswordResponse changeUserPasswordApiUsersChangePasswordLoginPost()


### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let login: string; // (default to undefined)

const { status, data } = await apiInstance.changeUserPasswordApiUsersChangePasswordLoginPost(
    login
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **login** | [**string**] |  | defaults to undefined|


### Return type

**UserPasswordResponse**

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

# **changeUserProfileInfoApiUsersProfileInfoLoginPost**
> UserResponse changeUserProfileInfoApiUsersProfileInfoLoginPost(changeProfileInfoRequest)


### Example

```typescript
import {
    UsersApi,
    Configuration,
    ChangeProfileInfoRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let login: string; // (default to undefined)
let changeProfileInfoRequest: ChangeProfileInfoRequest; //

const { status, data } = await apiInstance.changeUserProfileInfoApiUsersProfileInfoLoginPost(
    login,
    changeProfileInfoRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **changeProfileInfoRequest** | **ChangeProfileInfoRequest**|  | |
| **login** | [**string**] |  | defaults to undefined|


### Return type

**UserResponse**

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

# **createNewUserApiUsersPut**
> CreateUserResponse createNewUserApiUsersPut(createUserRequest)


### Example

```typescript
import {
    UsersApi,
    Configuration,
    CreateUserRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let createUserRequest: CreateUserRequest; //

const { status, data } = await apiInstance.createNewUserApiUsersPut(
    createUserRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createUserRequest** | **CreateUserRequest**|  | |


### Return type

**CreateUserResponse**

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

# **deleteUserApiUsersLoginDelete**
> BaseStatusResponse deleteUserApiUsersLoginDelete()


### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let login: string; // (default to undefined)

const { status, data } = await apiInstance.deleteUserApiUsersLoginDelete(
    login
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **login** | [**string**] |  | defaults to undefined|


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

# **getAllUsersApiUsersGet**
> PaginatedResponseUserResponse getAllUsersApiUsersGet()


### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let limit: number; // (optional) (default to 1000)
let page: number; // (optional) (default to 1)
let searchTerm: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.getAllUsersApiUsersGet(
    limit,
    page,
    searchTerm
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **limit** | [**number**] |  | (optional) defaults to 1000|
| **page** | [**number**] |  | (optional) defaults to 1|
| **searchTerm** | [**string**] |  | (optional) defaults to undefined|


### Return type

**PaginatedResponseUserResponse**

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

# **massDeleteUsersApiUsersMassDeleteUsersPost**
> MassUsersDeletionResponse massDeleteUsersApiUsersMassDeleteUsersPost(massUsersDeletionRequest)


### Example

```typescript
import {
    UsersApi,
    Configuration,
    MassUsersDeletionRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let massUsersDeletionRequest: MassUsersDeletionRequest; //

const { status, data } = await apiInstance.massDeleteUsersApiUsersMassDeleteUsersPost(
    massUsersDeletionRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **massUsersDeletionRequest** | **MassUsersDeletionRequest**|  | |


### Return type

**MassUsersDeletionResponse**

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

# **whoamiApiUsersWhoamiGet**
> UserResponse whoamiApiUsersWhoamiGet()


### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

const { status, data } = await apiInstance.whoamiApiUsersWhoamiGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**UserResponse**

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

