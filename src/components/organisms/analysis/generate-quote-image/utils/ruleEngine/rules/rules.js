export const rules = [
    function (words) {
        if (words <= 15) return 2.3
    },
    function (words) {
        if (words > 15 && words <= 30) return 2.1
    },
    function (words) {
        if (words > 30 && words <= 40) return 1.9
    },
    function (words) {
        if (words > 40 && words <= 50) return 1.8
    },
    function (words) {
        if (words > 50 && words <= 60) return 1.7
    },
    function (words) {
        if (words > 60 && words <= 70) return 1.6
    },
    function (words) {
        if (words > 70 && words <= 80) return 1.5
    },
    function (words) {
        if (words > 80 && words <= 90) return 1.4
    },
    function (words) {
        if (words > 90) return 1.3
    },
    function () {
        return 2.0
    },
]
