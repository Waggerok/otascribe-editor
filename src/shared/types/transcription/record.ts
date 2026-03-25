import type { OtaProject, WordExtendedInfo } from '@/shared/generated/api/generated';

export interface Speaker
{
    id: number
    name: string
}

export interface Sentense
{
    id: number
    text: string
    start: number
    end: number
    speaker: Speaker | undefined
    words: WordExtendedInfo[]
}

export interface IRecord
{
    sentenses: Sentense[]
    speakers: Speaker[]
}

export const generateRecord = (project: OtaProject, editable=false) =>
{
    const record: IRecord = {
        sentenses: [],
        speakers: [],
    };

    const result = editable ? project.editable_transcription_result : project.transcription_result;
    if (!result) return record;

    for (const sentence of result.sentences)
    {
        let speaker;

        if (sentence.speaker_id !== null && sentence.speaker_id !== undefined)
        {
            speaker = record.speakers.find(
                (speaker) =>
                    speaker.id === sentence.speaker_id,
            );

            if (!speaker)
            {

                /// TODO 04.03.2025: Consider, that speaker_name can be received from backend
                //  In future, this logic will be fixed, but now we need to consider how to implement this
                speaker = {
                    id: sentence.speaker_id,
                    name: sentence.speaker_name || `Собеседник ${sentence.speaker_id + 1}`,
                };

                record.speakers.push(speaker);
            }
        }

        record.sentenses.push({
            id: record.sentenses.length,
            text: sentence.text,
            speaker,
            start: sentence.start_millis,
            end: sentence.end_millis,
            words: sentence.words_extended_information || [],
        });
    }

    return record;
};
