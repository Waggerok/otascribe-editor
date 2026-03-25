# RecentProject


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**project_id** | **string** |  | [default to undefined]
**name** | **string** |  | [default to undefined]
**theme** | **string** |  | [optional] [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**updated_at** | **string** |  | [default to undefined]
**user_tags** | [**Array&lt;UserTagResponse&gt;**](UserTagResponse.md) |  | [optional] [default to undefined]
**last_options** | [**ProjectLastOptions**](ProjectLastOptions.md) |  | [optional] [default to undefined]
**stages** | [**ProjectStagesInformation**](ProjectStagesInformation.md) |  | [optional] [default to undefined]

## Example

```typescript
import { RecentProject } from './api';

const instance: RecentProject = {
    project_id,
    name,
    theme,
    description,
    updated_at,
    user_tags,
    last_options,
    stages,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
