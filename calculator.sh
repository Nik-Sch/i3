#/bin/bash


if [ -z $(pidof gnome-calculator) ]; then
    gnome-calculator &
    notify-send -u low -t 1000 "New calculator"
else
    ws_current=$(i3-msg -t get_workspaces | jq '.[] | select(.focused==true).num' | cut -d"\"" -f2)
    ws_calc=$(i3-msg -t get_tree | python ~/.config/i3/find_calc.py)
    if [ $ws_current == $ws_calc ]; then
        i3-msg "[class=\"Gnome-calculator\"] move workspace calc" > /dev/null
        notify-send -u low -t 1500 "Hiding calculator"
    else
        i3-msg "[class=\"Gnome-calculator\"] move workspace current" > /dev/null
        notify-send -u low -t 1500 "Moving calculator to current workspace"
    fi
fi
