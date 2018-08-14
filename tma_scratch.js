#!/usr/bin/env node

const exec = require("child_process").exec
const {env} = require('process');

function getNodes(data) {
    if (data.output &&  data.name && (data.name.search("MyTMA") > -1) && (data.output.search("__i3") > -1)) {
        return true;
    }

    if (data.nodes.length > 0 || data.floating_nodes.length > 0) {
        return data.nodes.concat(data.floating_nodes).reduce((acc, node) => {
            if (acc === true) {
                return true;
            }
            if (getNodes(node)) {
                return true;
            }
            return false;
        }, false)
    }
    return false;
}


exec("i3-msg -t get_tree", (error, stdout) => {
    j = JSON.parse(stdout);
    if (getNodes(j)) {
        exec("i3-msg [title=\"MyTMA\"] move workspace current");
    } else {
        exec("i3-msg [title=\"MyTMA\"] move scratchpad");
    }

});

