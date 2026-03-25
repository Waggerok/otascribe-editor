# ProjectsApi

All URIs are relative to */dev/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**addUserTagToProjectApiProjectAddTagProjectIdTagIdPost**](#addusertagtoprojectapiprojectaddtagprojectidtagidpost) | **POST** /api/project/add_tag/{project_id}/{tag_id} | Add User Tag To Project|
|[**cancelTaskApiProjectCancelTaskProjectIdDelete**](#canceltaskapiprojectcanceltaskprojectiddelete) | **DELETE** /api/project/cancel_task/{project_id} | Cancel Task|
|[**createTaskApiProjectCreateTaskPost**](#createtaskapiprojectcreatetaskpost) | **POST** /api/project/create_task | Create Task|
|[**deleteUserProjectApiProjectProjectIdDelete**](#deleteuserprojectapiprojectprojectiddelete) | **DELETE** /api/project/{project_id} | Delete User Project|
|[**downloadProjectFileApiProjectDownloadFileProjectIdGet**](#downloadprojectfileapiprojectdownloadfileprojectidget) | **GET** /api/project/download_file/{project_id} | Download Project File|
|[**downloadProjectFilesApiProjectMassDownloadProjectsPost**](#downloadprojectfilesapiprojectmassdownloadprojectspost) | **POST** /api/project/mass_download_projects | Download Project Files|
|[**fullSearchProjectsApiProjectFullSearchProjectsGet**](#fullsearchprojectsapiprojectfullsearchprojectsget) | **GET** /api/project/full_search_projects | Full Search Projects|
|[**getProjectAudioFilePeaksApiProjectGetPeaksProjectIdGet**](#getprojectaudiofilepeaksapiprojectgetpeaksprojectidget) | **GET** /api/project/get_peaks/{project_id} | Get Project Audio File Peaks|
|[**getRecentProjectsApiProjectRecentProjectsGet**](#getrecentprojectsapiprojectrecentprojectsget) | **GET** /api/project/recent_projects | Get Recent Projects|
|[**getUserProjectApiProjectProjectIdGet**](#getuserprojectapiprojectprojectidget) | **GET** /api/project/{project_id} | Get User Project|
|[**massDeleteProjectsApiProjectMassDeleteProjectsPost**](#massdeleteprojectsapiprojectmassdeleteprojectspost) | **POST** /api/project/mass_delete_projects | Mass Delete Projects|
|[**removeUserTagToProjectApiProjectRemoveTagProjectIdTagIdPost**](#removeusertagtoprojectapiprojectremovetagprojectidtagidpost) | **POST** /api/project/remove_tag/{project_id}/{tag_id} | Remove User Tag To Project|
|[**renameProjectApiProjectRenameProjectIdPost**](#renameprojectapiprojectrenameprojectidpost) | **POST** /api/project/rename/{project_id} | Rename Project|
|[**saveProjectChangesApiProjectSaveChangesPost**](#saveprojectchangesapiprojectsavechangespost) | **POST** /api/project/save_changes | Save Project Changes|

# **addUserTagToProjectApiProjectAddTagProjectIdTagIdPost**
> BaseStatusResponse addUserTagToProjectApiProjectAddTagProjectIdTagIdPost()


### Example

```typescript
import {
    ProjectsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectsApi(configuration);

let projectId: string; // (default to undefined)
let tagId: number; // (default to undefined)

const { status, data } = await apiInstance.addUserTagToProjectApiProjectAddTagProjectIdTagIdPost(
    projectId,
    tagId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **projectId** | [**string**] |  | defaults to undefined|
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

# **cancelTaskApiProjectCancelTaskProjectIdDelete**
> CancelTaskResponse cancelTaskApiProjectCancelTaskProjectIdDelete()


### Example

```typescript
import {
    ProjectsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectsApi(configuration);

let projectId: string; // (default to undefined)

const { status, data } = await apiInstance.cancelTaskApiProjectCancelTaskProjectIdDelete(
    projectId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **projectId** | [**string**] |  | defaults to undefined|


### Return type

**CancelTaskResponse**

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

# **createTaskApiProjectCreateTaskPost**
> CreateTaskResponse createTaskApiProjectCreateTaskPost(createTaskRequest)


### Example

```typescript
import {
    ProjectsApi,
    Configuration,
    CreateTaskRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectsApi(configuration);

let createTaskRequest: CreateTaskRequest; //

const { status, data } = await apiInstance.createTaskApiProjectCreateTaskPost(
    createTaskRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createTaskRequest** | **CreateTaskRequest**|  | |


### Return type

**CreateTaskResponse**

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

# **deleteUserProjectApiProjectProjectIdDelete**
> BaseMessageResponse deleteUserProjectApiProjectProjectIdDelete()


### Example

```typescript
import {
    ProjectsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectsApi(configuration);

let projectId: string; // (default to undefined)

const { status, data } = await apiInstance.deleteUserProjectApiProjectProjectIdDelete(
    projectId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **projectId** | [**string**] |  | defaults to undefined|


### Return type

**BaseMessageResponse**

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

# **downloadProjectFileApiProjectDownloadFileProjectIdGet**
> any downloadProjectFileApiProjectDownloadFileProjectIdGet()


### Example

```typescript
import {
    ProjectsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectsApi(configuration);

let projectId: string; // (default to undefined)

const { status, data } = await apiInstance.downloadProjectFileApiProjectDownloadFileProjectIdGet(
    projectId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **projectId** | [**string**] |  | defaults to undefined|


### Return type

**any**

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

# **downloadProjectFilesApiProjectMassDownloadProjectsPost**
> any downloadProjectFilesApiProjectMassDownloadProjectsPost(massProjectsDownloadRequest)


### Example

```typescript
import {
    ProjectsApi,
    Configuration,
    MassProjectsDownloadRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectsApi(configuration);

let massProjectsDownloadRequest: MassProjectsDownloadRequest; //

const { status, data } = await apiInstance.downloadProjectFilesApiProjectMassDownloadProjectsPost(
    massProjectsDownloadRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **massProjectsDownloadRequest** | **MassProjectsDownloadRequest**|  | |


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

# **fullSearchProjectsApiProjectFullSearchProjectsGet**
> PaginatedResponseFullTextSearchProjectResponse fullSearchProjectsApiProjectFullSearchProjectsGet()


### Example

```typescript
import {
    ProjectsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectsApi(configuration);

let searchQuery: string; // (default to undefined)
let limit: number; // (optional) (default to 10)
let page: number; // (optional) (default to 1)

const { status, data } = await apiInstance.fullSearchProjectsApiProjectFullSearchProjectsGet(
    searchQuery,
    limit,
    page
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **searchQuery** | [**string**] |  | defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to 10|
| **page** | [**number**] |  | (optional) defaults to 1|


### Return type

**PaginatedResponseFullTextSearchProjectResponse**

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

# **getProjectAudioFilePeaksApiProjectGetPeaksProjectIdGet**
> any getProjectAudioFilePeaksApiProjectGetPeaksProjectIdGet()


### Example

```typescript
import {
    ProjectsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectsApi(configuration);

let projectId: string; // (default to undefined)
let numPeaks: number; // (optional) (default to 100)

const { status, data } = await apiInstance.getProjectAudioFilePeaksApiProjectGetPeaksProjectIdGet(
    projectId,
    numPeaks
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **projectId** | [**string**] |  | defaults to undefined|
| **numPeaks** | [**number**] |  | (optional) defaults to 100|


### Return type

**any**

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

# **getRecentProjectsApiProjectRecentProjectsGet**
> PaginatedResponseRecentProject getRecentProjectsApiProjectRecentProjectsGet()


### Example

```typescript
import {
    ProjectsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectsApi(configuration);

let limit: number; // (optional) (default to 50)
let page: number; // (optional) (default to 1)
let searchTerm: string; // (optional) (default to undefined)
let searchTags: Array<number>; // (optional) (default to undefined)

const { status, data } = await apiInstance.getRecentProjectsApiProjectRecentProjectsGet(
    limit,
    page,
    searchTerm,
    searchTags
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **limit** | [**number**] |  | (optional) defaults to 50|
| **page** | [**number**] |  | (optional) defaults to 1|
| **searchTerm** | [**string**] |  | (optional) defaults to undefined|
| **searchTags** | **Array&lt;number&gt;** |  | (optional) defaults to undefined|


### Return type

**PaginatedResponseRecentProject**

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

# **getUserProjectApiProjectProjectIdGet**
> OtaProject getUserProjectApiProjectProjectIdGet()


### Example

```typescript
import {
    ProjectsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectsApi(configuration);

let projectId: string; // (default to undefined)
let lastUpdateTimestamp: string; //Last project update time (In ISO format) (optional) (default to undefined)

const { status, data } = await apiInstance.getUserProjectApiProjectProjectIdGet(
    projectId,
    lastUpdateTimestamp
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **projectId** | [**string**] |  | defaults to undefined|
| **lastUpdateTimestamp** | [**string**] | Last project update time (In ISO format) | (optional) defaults to undefined|


### Return type

**OtaProject**

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

# **massDeleteProjectsApiProjectMassDeleteProjectsPost**
> MassProjectsDeletionResponse massDeleteProjectsApiProjectMassDeleteProjectsPost(massProjectsDeletionRequest)


### Example

```typescript
import {
    ProjectsApi,
    Configuration,
    MassProjectsDeletionRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectsApi(configuration);

let massProjectsDeletionRequest: MassProjectsDeletionRequest; //

const { status, data } = await apiInstance.massDeleteProjectsApiProjectMassDeleteProjectsPost(
    massProjectsDeletionRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **massProjectsDeletionRequest** | **MassProjectsDeletionRequest**|  | |


### Return type

**MassProjectsDeletionResponse**

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

# **removeUserTagToProjectApiProjectRemoveTagProjectIdTagIdPost**
> BaseStatusResponse removeUserTagToProjectApiProjectRemoveTagProjectIdTagIdPost()


### Example

```typescript
import {
    ProjectsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectsApi(configuration);

let projectId: string; // (default to undefined)
let tagId: number; // (default to undefined)

const { status, data } = await apiInstance.removeUserTagToProjectApiProjectRemoveTagProjectIdTagIdPost(
    projectId,
    tagId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **projectId** | [**string**] |  | defaults to undefined|
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

# **renameProjectApiProjectRenameProjectIdPost**
> OtaProject renameProjectApiProjectRenameProjectIdPost(renameProjectRequest)


### Example

```typescript
import {
    ProjectsApi,
    Configuration,
    RenameProjectRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectsApi(configuration);

let projectId: string; // (default to undefined)
let renameProjectRequest: RenameProjectRequest; //

const { status, data } = await apiInstance.renameProjectApiProjectRenameProjectIdPost(
    projectId,
    renameProjectRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **renameProjectRequest** | **RenameProjectRequest**|  | |
| **projectId** | [**string**] |  | defaults to undefined|


### Return type

**OtaProject**

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

# **saveProjectChangesApiProjectSaveChangesPost**
> SaveProjectChangesResponse saveProjectChangesApiProjectSaveChangesPost(saveProjectChangesRequest)


### Example

```typescript
import {
    ProjectsApi,
    Configuration,
    SaveProjectChangesRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectsApi(configuration);

let saveProjectChangesRequest: SaveProjectChangesRequest; //

const { status, data } = await apiInstance.saveProjectChangesApiProjectSaveChangesPost(
    saveProjectChangesRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **saveProjectChangesRequest** | **SaveProjectChangesRequest**|  | |


### Return type

**SaveProjectChangesResponse**

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

