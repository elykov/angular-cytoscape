export class Coords2 {
    public x: number; 
    public y: number; 
}

export class CytoLayout {
    public name: string;
    public directed?: boolean;
    public padding?: number;
}

export class CytoElement {
    public group: string;
    public data: any;
    public scratch?: any;
    public position?: Coords2;
    public selected?: boolean = false; // whether the element is selected
    public selectable?: boolean = true; // whether the selection state is mutable
    public locked?: boolean = false; // when locked a node's position is immutable
    public grabbable?: boolean; // whether the node can be grabbed and moved by the user
    public pannable?: boolean; // whether dragging the node causes panning instead of grabbing
    public classes?: string[]; 
}

export class Cytoscape {
    constructor(
        public pan?: Coords2,
        public selectionType?: string, // 'single',
        public wheelSensitivity?: number, //1,
        public userZoomingEnabled?: boolean, //true
        public panningEnabled?: boolean, //true 
        public userPanningEnabled?: boolean, //true,
        public boxSelectionEnabled?: boolean, //true,
        public autolock?: boolean, //false,
        public autounselectify?: boolean, //false,
        public autoungrabify?: boolean, //false, 
        public touchTapThreshold?: number, // 8,
        public desktopTapThreshold?: number, //4,
        public headless?: boolean, //false,
        public styleEnabled?: boolean, //true,
        public hideEdgesOnViewport?: boolean, //false,
        public hideLabelsOnViewport?: boolean, //false,
        public textureOnViewport?: boolean, //false,
        public motionBlur?: boolean, //false,
        public motionBlurOpacity?: number, //0.2,
        public pixelRatio?: number //'auto'
    ) { }
}