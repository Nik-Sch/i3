#!/usr/bin/python

import sys
import json

js = json.load(sys.stdin)
for monitor_node in js['nodes']:
    if (monitor_node['name'] != '__i3'):
        for content_node in monitor_node['nodes']:
            if (content_node['name'] == 'content'):
                for ws_node in content_node['nodes']:
                    if (json.dumps(ws_node).find('gnome-calculator') > -1):
                        # print('found calculator on WS ' + str(ws_node['num']))
                        print(ws_node['num'])
                        sys.exit()
print(-1)
