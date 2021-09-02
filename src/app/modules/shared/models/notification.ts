export class Notification {

    constructor(
        public message: string,
        public time: Date,
        public type: NotificationType,
        public isSuccess = () => this.type === NotificationType.Success,
        public isInfo = () => this.type === NotificationType.Info,
        public isError = () => this.type === NotificationType.Error 
    ) {}
    
}

export enum NotificationType{
    Success,
    Error,
    Info
}
