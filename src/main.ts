import Blockly from "blockly";

Blockly.defineBlocksWithJsonArray([
    {
        "type": "child_block",
        "message0": "value",
        "output": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    }, {
        "type": "parent_block",
        "message0": "something %1 %2 %3",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "INPUT1"
            },
            {
                "type": "input_value",
                "name": "INPUT"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": false,
        "colour": 230,
        "tooltip": "",
        "helpUrl": "",
        "extensions": ["extension"]
    }
]);

Blockly.Extensions.register("extension", function (this: Blockly.Block) {
    this.workspace.addChangeListener(e => {
        if (e.type !== "move") return;
        console.log(e);
        const input = this.getInput("INPUT")!;
        if (!input) return;

        if (!input.connection?.isConnected()) {
            Blockly.Events.disable();

            const newBlock = this.workspace.newBlock("child_block");
            
            // @ts-ignore
            newBlock.initSvg();
            // @ts-ignore
            newBlock.render();

            input.connection!.connect(newBlock.outputConnection!);

            Blockly.Events.enable();
        }
    });
});

Blockly.inject("app", {
    zoom: { controls: true, wheel: true, startScale: 1, maxScale: 3, minScale: 0.3, scaleSpeed: 1.2 }, toolbox: {
        "kind": "flyoutToolbox",
        "contents": [
            {
                "kind": "block",
                "type": "parent_block",
                "inputs": {
                    "INPUT": {
                        "block": {
                            "type": "child_block"
                        }
                    }
                }
            },
            {
                "kind": "block",
                "type": "child_block"
            }
        ]
    }
});