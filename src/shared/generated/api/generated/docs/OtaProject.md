# OtaProject


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**project_id** | **string** |  | [default to undefined]
**file_path** | **string** |  | [default to undefined]
**owner_username** | **string** |  | [default to undefined]
**name** | **string** |  | [default to undefined]
**status** | [**ProjectStatus**](ProjectStatus.md) |  | [default to undefined]
**creation_date** | **string** |  | [default to undefined]
**updated_at** | **string** |  | [default to undefined]
**theme** | **string** |  | [optional] [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**transcription_result** | [**TranscriptionResult**](TranscriptionResult.md) |  | [optional] [default to undefined]
**meta_information** | [**ProjectMetaInformation**](ProjectMetaInformation.md) |  | [optional] [default to undefined]
**resume_result** | **string** |  | [optional] [default to undefined]
**editable_transcription_result** | [**TranscriptionResult**](TranscriptionResult.md) |  | [optional] [default to undefined]
**last_options** | [**ProjectLastOptions**](ProjectLastOptions.md) |  | [optional] [default to undefined]
**stages** | [**ProjectStagesInformation**](ProjectStagesInformation.md) |  | [optional] [default to undefined]
**position_in_queue** | **number** |  | [optional] [default to undefined]
**error_detail** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { OtaProject } from './api';

const instance: OtaProject = {
    project_id,
    file_path,
    owner_username,
    name,
    status,
    creation_date,
    updated_at,
    theme,
    description,
    transcription_result,
    meta_information,
    resume_result,
    editable_transcription_result,
    last_options,
    stages,
    position_in_queue,
    error_detail,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
