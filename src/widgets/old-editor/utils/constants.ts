export const PLAYBACK_NODE_STYLE_PREFIX = '/* PLAYBACK */';
export const SPOILER_NODE_STYLE_PREFIX = '/* SPOILER */';
export const CUSTOM_NODE_STYLE_PREFIX = '/* CUSTOM */';

export const AUTO_SAVE_TIMEOUT_MILLISECONDS = 500;

export const TRAFFIC_LIGHT_BAD_ACCURACY = 0.05;
export const TRAFFIC_LIGHT_NORMAL_ACCURACY = 0.39;

export const SKIP_FORMATTING_EVENTS = new Set(['bold', 'italic']);

export enum PasteDirection
{
    BEFORE = 'before',
    AFTER = 'after',
}
