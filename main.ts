player.onChat("moo", function (num1, num2) {
    Menagerie.createMooshroomMeadow(num1, num2, pos(0, 0, 0))
})
player.onChat("sniff", function (num1, num2) {
    Menagerie.createSnifferSanctuary(num1, num2, pos(0, 0, 0))
})
player.onChat("stride", function (num1, num2) {
    Menagerie.createStriderShelter(num1, num2, pos(0, 0, 0))
})
player.onChat("boo", function (num1, num2) {
    Menagerie.createSpookyStable(num1, num2, pos(0, 0, 0))
})
player.onChat("fly", function (num1, num2, num3) {
    Menagerie.createAllayAviary(
    num1,
    num2,
    num3,
    posCamera(0, 0, Math.ceil(num3 / 2) + 3)
    )
})
player.onChat("clear", function () {
    if (!(blocks.testForBlock(AIR, pos(0, -1, 0)))) {
        blocks.fill(
        GRASS,
        posCamera(-25, -1, 0),
        posCamera(25, -1, 50),
        FillOperation.Replace
        )
    }
    blocks.fill(
    AIR,
    posCamera(-25, 0, 0),
    posCamera(25, 10, 50),
    FillOperation.Replace
    )
    mobs.kill(
    mobs.target(ALL_ENTITIES)
    )
})
player.onChat("i", function () {
    agent.teleportToPlayer()
    player.say(agent.inspect(AgentInspection.Data, FORWARD))
})
