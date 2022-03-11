export function moment(_date: string) {
    let obj = new Date(_date);
    if (isNaN(obj.getDate())) {
        obj = new Date()
    }

    function relativeDate() {
        var min = 60 * 1000;
        var hour = min * 60;
        var day = hour * 24;
        var month = day * 30;
        var year = day * 365;

        var elapsed = Date.now() - obj.valueOf();

        if (elapsed < min) {
            return Math.round(elapsed / 1000) + ' seconds ago';
        }

        else if (elapsed < hour) {
            return Math.round(elapsed / min) + ' minutes ago';
        }

        else if (elapsed < day) {
            return Math.round(elapsed / hour) + ' hours ago';
        }

        else if (elapsed < month) {
            return + Math.round(elapsed / day) + ' days ago';
        }

        else if (elapsed < year) {
            return + Math.round(elapsed / month) + ' months ago';
        }
    }

    function locale(_locale: string) {
        return new Intl.DateTimeFormat(_locale, { dateStyle: 'medium', timeStyle: 'medium' }).format(obj)
    }

    return { locale, fromNow: relativeDate }
}