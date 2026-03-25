export interface TranscriptionTaskParameters
{
    diarization: boolean;
    num_speakers: number | 'auto' | null;
    force_language: string | null;
    audio_type: string | null;
    speakers?: string[];
    suppress_numerals : boolean;
    noise_reduction : boolean;
    words_extended_information : boolean;
    detect_obscene_words : boolean;
}
