import md5 from "MD5";

export const getInitials = (name: string, length: number = 2) =>
{
    let splitted = name.split(' ');
    if (splitted.length > length) splitted = splitted.slice(0, 2);

    return splitted.map((word: string) =>
        word.toUpperCase()[0]).join('').slice(0, length);
};

/**
 * Преобразует числовое значение канала (0..255) в HEX-строку
 * @param c Значение канала (0..255)
 * @returns HEX-строка (два символа)
 */
function toHex(c: number): string
{
    const hex = c.toString(16).toUpperCase();

    return hex.length === 1 ? '0' + hex : hex;
}

/**
 * Преобразует HSL-цвет в RGB-формат
 * @param h Оттенок (0..1)
 * @param s Насыщенность (0..1)
 * @param l Светлота (0..1)
 * @returns Кортеж с RGB-компонентами [r, g, b] (каждый 0..255)
 */
function hslToRgb(h: number, s: number, l: number): [number, number, number]
{
    let r: number, g: number, b: number;

    if (s === 0)
    {
        // Нет насыщенности – achromatic (серые цвета)
        r = g = b = l;
    }
    else
    {
        const hue2rgb = (p: number, q: number, t: number): number =>
        {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;

            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/**
 * Генерирует цвет для спикера на основе его имени и темы
 * @param name Имя спикера
 * @param theme Тема оформления ('light' | 'dark' или любая другая строка)
 * @returns HEX-строка с цветом (#RRGGBB)
 */
export function getSpeakerColor(name: string, theme: 'light' | 'dark' | string = 'light'): string
{
    // Вычисляем MD5-хеш имени (32 символа в шестнадцатеричном формате)
    const hash: string = md5(name);

    // --- Расчёт оттенка (hue) ---
    const hexHue: string = hash.slice(6, 12);
    const hue: number = (Number.parseInt(hexHue, 16) % 360) / 360;

    // --- Расчёт насыщенности (saturation) ---
    const hexSat: string = hash.slice(6, 8);
    const satValue: number = Number.parseInt(hexSat, 16);
    const saturation: number = 0.4 + (satValue / 255) * 0.4;

    // --- Расчёт светлоты (lightness) ---
    const hexLight: string = hash.slice(8, 10);
    const lightValue: number = Number.parseInt(hexLight, 16);
    let lightness: number;

    if (theme === 'light')
    {
        lightness = 0.35 + (lightValue / 255) * 0.2;
    }
    else if (theme === 'dark')
    {
        lightness = 0.55 + (lightValue / 255) * 0.2;
    }
    else
    {
        lightness = 0.45 + (lightValue / 255) * 0.1;
    }

    // Получаем RGB-компоненты
    const [r, g, b]: [number, number, number] = hslToRgb(hue, saturation, lightness);

    return '#' + toHex(r) + toHex(g) + toHex(b);
}

/**
     * Converts a time in seconds to a string in mm:ss format.
     * @param {number} seconds The time in seconds.
     * @returns {string} The time formatted as mm:ss.
     */
export const formatTime = (seconds: number) =>
{
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    return hrs > 0 ? `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}` : `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const formatDate = (dateString: string) =>
{
    const date = new Date(dateString);

    return date
        .toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
        .replace(/^(\d{1,2})\s([а-яА-Яa-zA-ZёЁ]+)\s(\d{4}),/, '$1 $2 $3 г.,');
};

export const formatMilliseconds: (milliseconds: number) => string = (milliseconds: number) =>
{
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Pad the hours, minutes, and seconds with leading zeros if needed
    const paddedHours = String(hours).padStart(2, '0');
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');

    if (hours == 0) return `${paddedMinutes}:${paddedSeconds}`;

    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
};