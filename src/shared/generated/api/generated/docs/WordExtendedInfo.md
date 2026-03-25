# WordExtendedInfo

This structure describes information about single words (Info from Wav2Vec2 model)

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**word** | **string** |  | [default to undefined]
**start_millis** | **number** |  | [default to undefined]
**end_millis** | **number** |  | [default to undefined]
**accuracy** | **number** |  | [default to undefined]
**speaker_id** | **number** |  | [optional] [default to undefined]
**is_obscene** | **boolean** |  | [optional] [default to false]

## Example

```typescript
import { WordExtendedInfo } from './api';

const instance: WordExtendedInfo = {
    word,
    start_millis,
    end_millis,
    accuracy,
    speaker_id,
    is_obscene,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
