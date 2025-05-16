export type ENUM_PRIORITY = "high" | "medium" | "low"

export const priority = [{
    id: 1,
    title: "Cao",
    subtitle: "Mức ưu tiên cao",
    value: "high",
    color: "#ee2222"
}, {
    id: 2,
    title: "Trung bình",
    subtitle: "Mức ưu tiên trung bình",
    value: "medium",
    color: "#ff9800"
}, {
    id: 3,
    title: "Thấp",
    subtitle: "Mức ưu tiên thấp",
    value: "low",
    color: "#4caf50"
}]

export const priorityOrder = {
    high: 0,
    medium: 1,
    low: 2,
};
