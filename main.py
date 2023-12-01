def on_on_chat(num1, num2):
    Menagerie.create_sniffer_sanctuary(num1, num2, pos(0, 0, 0))
player.on_chat("t", on_on_chat)

def on_on_chat2(num12, num22):
    Menagerie.create_sniffer_sanctuary(num12, num22, pos(0, 0, 0))
player.on_chat("sniff", on_on_chat2)

def on_on_chat3(num13, num23, num3):
    Menagerie.create_allay_aviary(num13,
        num23,
        num3,
        pos_camera(0, 0, Math.ceil(num3 / 2) + 3))
player.on_chat("fly", on_on_chat3)

def on_on_chat4(num14, num24):
    Menagerie.create_strider_shelter(num14, num24, pos(0, 0, 0))
player.on_chat("stride", on_on_chat4)

def on_on_chat5(num15, num25):
    Menagerie.create_mooshroom_meadow(num15, num25, pos(0, 0, 0))
player.on_chat("moo", on_on_chat5)

def on_on_chat6(num16, num26):
    Menagerie.create_spooky_stable(num16, num26, pos(0, 0, 0))
player.on_chat("boo", on_on_chat6)

def on_on_chat7():
    agent.teleport_to_player()
    player.say(agent.inspect(AgentInspection.DATA, FORWARD))
player.on_chat("i", on_on_chat7)

def on_on_chat8():
    if not blocks.test_for_block(AIR, pos(0, -1, 0)):
        blocks.fill(GRASS,
            pos_camera(-25, -1, 0),
            pos_camera(25, -1, 50),
            FillOperation.REPLACE)
    blocks.fill(AIR,
        pos_camera(-25, 0, 0),
        pos_camera(25, 10, 50),
        FillOperation.REPLACE)
    mobs.kill(mobs.target(ALL_ENTITIES))
player.on_chat("clear", on_on_chat8)
