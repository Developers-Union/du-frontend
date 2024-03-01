Date.prototype.format = function () {
    return `${this.getFullYear()}/${(this.getMonth() + 1 + "").padStart(2, "0")}/${(this.getDate() + "").padStart(2, "0")} ${(this.getHours() + "").padStart(2, "0")}:${(this.getMinutes() + "").padStart(2, "0")}:${(this.getSeconds() + "").padStart(2, "0")}`
};