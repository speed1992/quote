export const rules = [
    function (value, { start }) {
        if (start <= 20) return 500
    },
    function (value, { start }) {
        if (start > 20 && start <= 40) return 600
    },
    function (value, { start }) {
        if (start > 40 && start <= 60) return 1000
    },
    function (value, { start }) {
        if (start > 60 && start <= 100) return 1400
    },
    function (value, { start }) {
        if (start > 100) return 2000
    },
    function () {
        return 800
    },
]
