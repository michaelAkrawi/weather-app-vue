import Vue from "vue"

export function getDayText(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
}

export function notify(type, text) {
    Vue.notify({
        group: "alerts",
        title: "Great",
        text: text,
        type: type,
    });
}