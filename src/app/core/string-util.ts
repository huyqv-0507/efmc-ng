// StringUtil.format('{0} {1}', param1, param2,...);
export class StringUtil {
    public static format(string: string, ...replacements: string[]): string {
        return string.replace(/{(\d+)}/g, function (match, number) {
            return typeof replacements[number] != 'undefined'
                ? replacements[number]
                : match
                ;
        });
    }
}
