/* https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-9.html */

// interface AudioTrackList {
// 	[Symbol.iterator](): IterableIterator<AudioTrack>;
// }
interface HTMLVideoElement {
	// readonly audioTracks: AudioTrackList
	msFrameStep(forward: boolean): void;
	msInsertVideoEffect(activatableClassId: string, effectRequired: boolean, config?: any): void;
	msSetVideoRectangle(left: number, top: number, right: number, bottom: number): void;
	webkitEnterFullScreen(): void;
	webkitEnterFullscreen(): void;
	webkitExitFullScreen(): void;
	webkitExitFullscreen(): void;
	msHorizontalMirror: boolean;
	readonly msIsLayoutOptimalForPlayback: boolean;
	readonly msIsStereo3D: boolean;
	msStereo3DPackingMode: string;
	msStereo3DRenderMode: string;
	msZoom: boolean;
	onMSVideoFormatChanged: ((this: HTMLVideoElement, ev: Event) => any) | null;
	onMSVideoFrameStepCompleted: ((this: HTMLVideoElement, ev: Event) => any) | null;
	onMSVideoOptimalLayoutChanged: ((this: HTMLVideoElement, ev: Event) => any) | null;
	webkitDisplayingFullscreen: boolean;
	webkitSupportsFullscreen: boolean;
}
interface MediaError {
	readonly msExtendedCode: number;
	readonly MS_MEDIA_ERR_ENCRYPTED: number;
}
