import { timer, Observable } from 'rxjs';

export class Task{
// tslint:disable: variable-name
    private _id: number;
    private _name: string;
    private _color: string;
    private _startTime: number;
    private _endTime: number;
    private _isActive: boolean;
    private _runningTime: number;
    private _previousRunningTime: number;
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    public get endTime(): number {
        return this._endTime;
    }
    public set endTime(value: number) {
        this._endTime = value;
    }
    public get startTime(): number {
        return this._startTime;
    }
    public set startTime(value: number) {
        this._startTime = value;
    }
    public get color(): string {
        return this._color;
    }
    public set color(value: string) {
        this._color = value;
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get isActive(): boolean {
        return this._isActive;
    }
    public set isActive(value: boolean) {
        this._isActive = value;
    }
    public get runningTime(): number {
        return this._runningTime;
    }
    public set runningTime(value) {
        this._runningTime = value;
    }
    public get previousRunningTime(): number {
        return this._previousRunningTime;
    }
    public set previousRunningTime(value) {
        this._previousRunningTime = value;
    }

}
