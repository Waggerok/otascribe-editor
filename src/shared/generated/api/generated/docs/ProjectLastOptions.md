# ProjectLastOptions


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**force_language** | **string** |  | [optional] [default to undefined]
**batch_size** | **number** |  | [optional] [default to undefined]
**suppress_numerals** | **boolean** | Replace numerical digits with their pronunciation, increases diarization accuracy | [optional] [default to true]
**words_extended_information** | **boolean** | Enable words extended info (It means: run wav2vec2 model after transcribation process to get accuracy and timings for every word) | [optional] [default to false]
**noise_reduction** | **boolean** | Noise reduction (DeepFilterNet for this task) | [optional] [default to false]
**detect_obscene_words** | **boolean** | Detect obscene words (only for RU language now) | [optional] [default to false]
**obscene_threshold** | **number** | Threshold (upper bound) for obscene words. Don\&#39;t change it if you don\&#39;t know what it is. | [optional] [default to 0.7]
**audio_type** | **string** |  | [optional] [default to undefined]
**num_speakers** | **number** |  | [optional] [default to undefined]
**demucs_enabled** | **boolean** | This tool separates track into vocals &amp; non-vocals (cutting the noise) | [optional] [default to true]
**beautify_speakers_order** | **boolean** | Beautify speakers order (first speaker_id &#x3D; 1, second speaker_id &#x3D; 2, etc) | [optional] [default to true]
**is_diarization** | **boolean** |  | [optional] [default to false]

## Example

```typescript
import { ProjectLastOptions } from './api';

const instance: ProjectLastOptions = {
    force_language,
    batch_size,
    suppress_numerals,
    words_extended_information,
    noise_reduction,
    detect_obscene_words,
    obscene_threshold,
    audio_type,
    num_speakers,
    demucs_enabled,
    beautify_speakers_order,
    is_diarization,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
