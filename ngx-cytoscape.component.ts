import { Component, OnChanges, ElementRef, Input } from '@angular/core';
import { CytoElement, Cytoscape, CytoLayout } from './ngx-cytoscape';
declare var jQuery: any;
declare var cytoscape: any;

@Component({
    selector: 'ngx-cytoscape',
    template: '<div id="cy"></div>',
    styles: [`#cy {
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }`]
})
export class NgxCytoscapeComponent implements OnChanges {

    private _elements: CytoElement[];
    private _style: any[];
    private _layout: CytoLayout;
    private _zoom: any;
    private _cy: any;
    private _options: Cytoscape;
    
    private _afterRender: Function;
    private _subscribes: Function;

    public constructor(private _el: ElementRef) {
        this._layout = this._layout || {
            name: 'grid',
            directed: true,
            padding: 0
        };

        this._zoom = this._zoom || {
            min: 0.1,
            max: 1.5
        };

        this._style = this._style || this.getStyles();
    }

    public ngOnChanges(): any {
        this.render();
    }

    public render() {
        if (!this._cy) {
            let cyto = {
                container: this.el.nativeElement,
                layout: this.layout,
                minZoom: this.zoom.min,
                maxZoom: this.zoom.max,
                style: this.style,
                elements: this.elements,
            };
            Object.assign(cyto, this._options);
            this._cy = cytoscape(cyto);
            if (this._subscribes) {
              this._subscribes(this._cy);
            }
            else {
              console.log("Subscribes not defined.");
            }
        } else {
            // this._cy.layout = this.layout;
            // this._cy.nodes().remove();
            // this._cy.add(this.elements);
            // this._cy.minZoom(this.zoom.min);
            // this._cy.maxZoom(this.zoom.max);
            
            // Have to stop existing layout instance.
            let oldlayout = this._cy.LayoutInstance;
            if (oldlayout) {
                oldlayout.stop();
            }

            this._cy.nodes().remove();
            let nodes = this._cy.add(this.elements);
            let layout = nodes.layout(this.layout);
            layout.run();
            this._cy.minZoom(this.zoom.min);
            this._cy.maxZoom(this.zoom.max);
        }
        if (this._afterRender) {
          this._afterRender(this._cy);
        }
        else {
          console.log("AfterRender not defined.");
        }
    }

    private getStyles() {
        return cytoscape.stylesheet()
        .selector('node')
        .css({
            'content': 'data(name)',
            'shape': 'rectangle',
            'text-valign': 'center',
            'background-color': 'data(faveColor)',
            'width': '200px',
            'height': '100px',
            'color': 'black'
        })
        .selector(':selected')
        .css({
            'border-width': 3,
            'border-color': '#333'
        })
        .selector('edge')
        .css({
            //'label': 'data(label)',
            //'width': 'mapData(strength, 70, 100, 2, 6)',
            'color': 'black',
            'curve-style': 'bezier',
            'opacity': 0.666,
            'target-arrow-shape': 'triangle',
            'line-color': 'data(faveColor)',
            'source-arrow-color': 'data(faveColor)',
            'target-arrow-color': 'data(faveColor)'
        })
        .selector('edge.questionable')
        .css({
            'line-style': 'dotted',
            'target-arrow-shape': 'diamond'
        })
        .selector('.faded')
        .css({
            'opacity': 0.25,
            'text-opacity': 0
        });
    }

    @Input()
    set afterRender(value: Function) {
        this._afterRender = value;
    }

    @Input()
    set subscribes(value: Function) {
        this._subscribes = value;
    }

    get elements(): any { 
        return this._elements;
    }

    @Input()
    set elements(value: any) {
        this._elements = value;
    }

    get style(): any {
        return this._style;
    }

    @Input()
    set style(value: any) {
        this._style = value;
    }

    get layout(): any {
        return this._layout;
    }

    @Input()
    set layout(value: any) {
        this._layout = value;
    }

    get zoom(): any {
        return this._zoom;
    }

    @Input()
    set zoom(value: any) {
        this._zoom = value;
    }

    get cy(): any {
        return this._cy;
    }

    @Input()
    set cy(value: any) {
        this._cy = value;
    }

    get el(): ElementRef {
        return this._el;
    }

    @Input()
    set el(value: ElementRef) {
        this._el = value;
    }

    get options(): Cytoscape {
        return this._options;
    }
    
    @Input()
    set options(value: Cytoscape) {
        this._options = value;
    }
}
