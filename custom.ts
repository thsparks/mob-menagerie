/**
 * Mob Menagerie
 */
//% weight=100 color=#0fbc11 icon="\uf7ab"
namespace Menagerie {

    const mmBuilder: builder.Builder = new builder.Builder();

    /**
     * Create a Sniffer Sanctuary
     * @param width Width of the sanctuary (x axis)
     * @param depth Depth of the sanctuary (z axis)
     * @param position Position of the center of the sanctuary
     */
    //% block="create sniffer sanctuary with width %width depth %depth at %position"
    //% position.shadow=minecraftCreatePosition
    export function createSnifferSanctuary(width: number, depth: number, position: Position): void {
        // Fix the position so it doesn't move if the player moves
        position = position.toWorld();

        createEnclosure(width, depth, position, MOSS_BLOCK, MOSSY_COBBLESTONE_WALL);

        decorateEnclosure(width, depth, position, [TORCHFLOWER], 0.1, 0.3);

        // Spawn sniffers
        spawnMobs(width, depth, position, [AnimalMob.Sniffer], 0.01, 0.02);
    }

    /**
     * Create an Allay Aviary
     * @param width Width of the aviary (x axis)
     * @param width Height of the aviary (y axis)
     * @param depth Depth of the aviary (z axis)
     * @param position Position of the center of the aviary
     */
    //% block="create allay aviary with width %width height %height depth %depth at %position"
    //% position.shadow=minecraftCreatePosition
    export function createAllayAviary(width: number, height: number, depth: number, position: Position): void {
        // Fix the position so it doesn't move if the player moves
        position = position.toWorld();

        const minCorner = getMinCornerOfSquare(width, depth, position).move(CardinalDirection.Down, 1);
        const maxCorner = positions.add(minCorner, pos(width - 1, height, depth - 1)); // Floor is not included in height, hence no -1 on height.
        blocks.fill(GLASS, minCorner, maxCorner, FillOperation.Hollow);

        const maxFloorCorner = positions.add(minCorner, pos(width - 1, 0, depth - 1));
        blocks.fill(CHISELED_QUARTZ_BLOCK, minCorner, maxFloorCorner, FillOperation.Replace)

        // Spawn allays
        spawnMobs(width, depth, position, [AnimalMob.Allay], 0.3, 0.5);
    }

    /**
     * Create a Strider Shelter
     * @param width Width of the shelter (x axis)
     * @param depth Depth of the shelter (z axis)
     * @param position Position of the center of the shelter
     */
    //% block="create strider shelter with width %width depth %depth at %position"
    //% position.shadow=minecraftCreatePosition
    export function createStriderShelter(width: number, depth: number, position: Position): void {
        // Fix the position so it doesn't move if the player moves
        position = position.toWorld();

        // Bone block with data 4 rotates it so the "circle" side is not visible
        createEnclosure(width, depth, position, NETHERRACK, CRIMSON_FENCE)

        decorateEnclosure(width, depth, position, [FIRE], 0.05, 0.1);
        if (width > 5 && depth > 5) {
            // We have enough space to add some lava, but we need to keep it close to the center
            decorateEnclosure(width - 2, depth - 2, position.move(CardinalDirection.Down, 1), [LAVA], 0.6, 0.8, NETHERRACK);
        }

        // Spawn striders
        spawnMobs(width, depth, position, [AnimalMob.Strider], 0.05, 0.1);
    }

    /**
     * Create a Spooky Stable
     * @param width Width of the stable (x axis)
     * @param depth Depth of the stable (z axis)
     * @param position Position of the center of the stable
     */
    //% block="create spooky stable with width %width depth %depth at %position"
    //% position.shadow=minecraftCreatePosition
    export function createSpookyStable(width: number, depth: number, position: Position): void {
        // Fix the position so it doesn't move if the player moves
        position = position.toWorld();

        // Bone block with data 4 rotates it so the "circle" side is not visible
        createEnclosure(width, depth, position, blocks.blockWithData(BONE_BLOCK, 4), WARPED_FENCE)

        // Spawn spooky horses
        spawnMobs(width, depth, position, [AnimalMob.ZombieHorse, AnimalMob.SkeletonHorse], 0.01, 0.02);
    }

    /**
     * Create a Mooshroom Meadow
     * @param width Width of the meadow (x axis)
     * @param depth Depth of the meadow (z axis)
     * @param position Position of the center of the meadow
     */
    //% block="create mooshroom meadow with width %width depth %depth at %position"
    //% position.shadow=minecraftCreatePosition
    export function createMooshroomMeadow(width: number, depth: number, position: Position): void {
        // Fix the position so it doesn't move if the player moves
        position = position.toWorld();

        createEnclosure(width, depth, position, MYCELIUM, SPRUCE_FENCE)

        // Add sporadic mushrooms
        const mushrooms = [
            RED_MUSHROOM,
            BROWN_MUSHROOM
        ]
        decorateEnclosure(width, depth, position, mushrooms, 0.01, 0.02);

        // Spawn mooshrooms
        spawnMobs(width, depth, position, [AnimalMob.MushroomCow], 0.02, 0.03);
    }

    /**
     * Create a Bee Bungalow
     * @param width Width of the bungalow (x axis)
     * @param depth Depth of the bungalow (z axis)
     * @param position Position of the center of the bungalow
     */
    //% block="create bee bungalow with width %width depth %depth at %position"
    //% position.shadow=minecraftCreatePosition
    export function createBeeBungalow(width: number, depth: number, position: Position): void {
        position = position.toWorld();

        createEnclosure(width, depth, position, GRASS, BIRCH_FENCE);
        decorateEnclosure(width, depth, position, [YELLOW_FLOWER, BEE_NEST], 0.03, 0.06);
        spawnMobs(width, depth, position, [AnimalMob.Bee], 0.03, 0.05);
    }

    /**
     * Create an Axolotl Aquarium
     * @param width Width of the aquarium (x axis)
     * @param depth Depth of the aquarium (z axis)
     * @param position Position of the center of the aquarium
     */
    //% block="create axolotl aquarium with width %width depth %depth at %position"
    //% position.shadow=minecraftCreatePosition
    export function createAxolotlAquarium(width: number, depth: number, position: Position): void {
        position = position.toWorld();

        createAquaticEnclosure(width, depth, position, SAND);
        spawnMobs(width, depth, position, [AnimalMob.Axolotl], 0.02, 0.04);
    }

    /**
     * Create a Goat Grove
     * @param width Width of the grove (x axis)
     * @param depth Depth of the grove (z axis)
     * @param position Position of the center of the grove
     */
    //% block="create goat grove with width %width depth %depth at %position"
    //% position.shadow=minecraftCreatePosition
    export function createGoatGrove(width: number, depth: number, position: Position): void {
        position = position.toWorld();

        createEnclosure(width, depth, position, STONE, SPRUCE_FENCE);
        spawnMobs(width, depth, position, [AnimalMob.Goat], 0.01, 0.02);
    }

    /**
     * Create a Panda Preserve
     * @param width Width of the preserve (x axis)
     * @param depth Depth of the preserve (z axis)
     * @param position Position of the center of the preserve
     */
    //% block="create panda preserve with width %width depth %depth at %position"
    //% position.shadow=minecraftCreatePosition
    export function createPandaPreserve(width: number, depth: number, position: Position): void {
        position = position.toWorld();

        createEnclosure(width, depth, position, GRASS, JUNGLE_FENCE);
        decorateEnclosure(width, depth, position, [BAMBOO], 0.03, 0.06);
        spawnMobs(width, depth, position, [AnimalMob.Panda], 0.01, 0.02);
    }

    /**
     * Create a Parrot Pavilion
     * @param width Width of the pavilion (x axis)
     * @param depth Depth of the pavilion (z axis)
     * @param position Position of the center of the pavilion
     */
    //% block="create parrot pavilion with width %width depth %depth at %position"
    //% position.shadow=minecraftCreatePosition
    export function createParrotPavilion(width: number, depth: number, position: Position): void {
        position = position.toWorld();

        createEnclosure(width, depth, position, GRASS, JUNGLE_FENCE);
        spawnMobs(width, depth, position, [AnimalMob.Parrot], 0.03, 0.05);
    }

    /**
     * Create a Polar Bear Park
     * @param width Width of the park (x axis)
     * @param depth Depth of the park (z axis)
     * @param position Position of the center of the park
     */
    //% block="create polar bear park with width %width depth %depth at %position"
    //% position.shadow=minecraftCreatePosition
    export function createPolarBearPark(width: number, depth: number, position: Position): void {
        position = position.toWorld();

        createEnclosure(width, depth, position, PACKED_ICE, SPRUCE_FENCE);
        decorateEnclosure(width, depth, position, [SNOW], 0.05, 0.1);
        spawnMobs(width, depth, position, [AnimalMob.PolarBear], 0.01, 0.02);
    }

    /**
     * Create a Turtle Terrace
     * @param width Width of the terrace (x axis)
     * @param depth Depth of the terrace (z axis)
     * @param position Position of the center of the terrace
     */
    //% block="create turtle terrace with width %width depth %depth at %position"
    //% position.shadow=minecraftCreatePosition
    export function createTurtleTerrace(width: number, depth: number, position: Position): void {
        position = position.toWorld();

        createAquaticEnclosure(width, depth, position, SAND);
        spawnMobs(width, depth, position, [AnimalMob.SeaTurtle], 0.01, 0.02);
    }

    /**
     * Create a Dolphin Lagoon
     * @param width Width of the lagoon (x axis)
     * @param depth Depth of the lagoon (z axis)
     * @param position Position of the center of the lagoon
     */
    //% block="create dolphin lagoon with width %width depth %depth at %position"
    //% position.shadow=minecraftCreatePosition
    export function createDolphinLagoon(width: number, depth: number, position: Position): void {
        position = position.toWorld();

        createAquaticEnclosure(width, depth, position, PRISMARINE);
        spawnMobs(width, depth, position, [AnimalMob.Dolphin], 0.01, 0.02);
    }

    /**
     * Create a Fox Forest
     * @param width Width of the forest (x axis)
     * @param depth Depth of the forest (z axis)
     * @param position Position of the center of the forest
     */
    //% block="create fox forest with width %width depth %depth at %position"
    //% position.shadow=minecraftCreatePosition
    export function createFoxForest(width: number, depth: number, position: Position): void {
        position = position.toWorld();

        createEnclosure(width, depth, position, GRASS, SPRUCE_FENCE);
        spawnMobs(width, depth, position, [AnimalMob.Fox], 0.02, 0.03);
    }

    /**
     * Create a Rabbit Retreat
     * @param width Width of the retreat (x axis)
     * @param depth Depth of the retreat (z axis)
     * @param position Position of the center of the retreat
     */
    //% block="create rabbit retreat with width %width depth %depth at %position"
    //% position.shadow=minecraftCreatePosition
    export function createRabbitRetreat(width: number, depth: number, position: Position): void {
        position = position.toWorld();

        createEnclosure(width, depth, position, GRASS, BIRCH_FENCE);
        decorateEnclosure(width, depth, position, [YELLOW_FLOWER], 0.03, 0.06);
        spawnMobs(width, depth, position, [AnimalMob.Rabbit], 0.03, 0.05);
    }

    /**
     * Create a Bat Belfry
     * @param width Width of the belfry (x axis)
     * @param depth Depth of the belfry (z axis)
     * @param position Position of the center of the belfry
     */
    //% block="create bat belfry with width %width depth %depth at %position"
    //% position.shadow=minecraftCreatePosition
    export function createBatBelfry(width: number, depth: number, position: Position): void {
        position = position.toWorld();

        createEnclosure(width, depth, position, STONE, IRON_BARS);
        spawnMobs(width, depth, position, [AnimalMob.Bat], 0.03, 0.05);
    }

    /**
     * Create a Glow Squid Grotto
     * @param width Width of the grotto (x axis)
     * @param depth Depth of the grotto (z axis)
     * @param position Position of the center of the grotto
     */
    //% block="create glow squid grotto with width %width depth %depth at %position"
    //% position.shadow=minecraftCreatePosition
    export function createGlowSquidGrotto(width: number, depth: number, position: Position): void {
        position = position.toWorld();

        createAquaticEnclosure(width, depth, position, PRISMARINE);
        spawnMobs(width, depth, position, [AnimalMob.Squid, AnimalMob.GlowSquid], 0.02, 0.04);
    }

    /**
     * Create a Barnyard Bonanza
     * @param width Width of the barnyard (x axis)
     * @param depth Depth of the barnyard (z axis)
     * @param position Position of the center of the barnyard
     */
    //% block="create barnyard bonanza with width %width depth %depth at %position"
    //% position.shadow=minecraftCreatePosition
    export function createBarnyardBonanza(width: number, depth: number, position: Position): void {
        position = position.toWorld();

        createEnclosure(width, depth, position, GRASS, OAK_FENCE);
        decorateEnclosure(width, depth, position, [HAY_BLOCK], 0.01, 0.02);
        spawnMobs(width, depth, position, [AnimalMob.Chicken, AnimalMob.Cow, AnimalMob.Pig, AnimalMob.Sheep], 0.03, 0.05);
    }

    /**
     * Create a Pack Animal Paddock
     * @param width Width of the paddock (x axis)
     * @param depth Depth of the paddock (z axis)
     * @param position Position of the center of the paddock
     */
    //% block="create pack animal paddock with width %width depth %depth at %position"
    //% position.shadow=minecraftCreatePosition
    export function createPackAnimalPaddock(width: number, depth: number, position: Position): void {
        position = position.toWorld();

        createEnclosure(width, depth, position, DIRT, ACACIA_FENCE);
        decorateEnclosure(width, depth, position, [HAY_BLOCK], 0.01, 0.02);
        spawnMobs(width, depth, position, [AnimalMob.Horse, AnimalMob.Donkey, AnimalMob.Mule, AnimalMob.Llama], 0.02, 0.04);
    }

    function spawnMobs(width: number, depth: number, position: Position, mobsToSpawn: number[], minDensity: number, maxDensity: number,) {
        const [innerMin, innerMax] = getInnerSquareBounds(width, depth, position);
        const area = (width - 2) * (depth - 2);
        const minCount = Math.floor(area * minDensity);
        const maxCount = Math.floor(area * maxDensity);

        // At least one of each mob
        const count = Math.max(mobsToSpawn.length, randint(minCount, maxCount));

        for (let i = 0; i < count; i++) {
            mobs.spawn(mobsToSpawn[i % mobsToSpawn.length], randpos(innerMin, innerMax));
        }
    }

    function decorateEnclosure(
                            width: number,
                            depth: number,
                            position: Position,
                            items: number[],
                            minDensity: number,
                            maxDensity: number,
                            replaceBlock: number = 0) { // 0 = AIR
        const [innerMin, innerMax] = getInnerSquareBounds(width, depth, position);
        const area = (width - 2) * (depth - 2);
        const minCount = Math.floor(area * minDensity);
        const maxCount = Math.floor(area * maxDensity);
        const count = randint(minCount, maxCount);
        for (let i = 0; i < count; i++) {
            const item = items[randint(0, items.length - 1)];
            const pos = randpos(innerMin, innerMax);
            if (blocks.testForBlock(replaceBlock, pos)) {
                blocks.place(item, pos);
            }
        }
    }

    function createAquaticEnclosure(width: number, depth: number, position: Position, floorMaterial: number) {
        createEnclosure(width, depth, position, floorMaterial, GLASS);
        const [innerMin, innerMax] = getInnerSquareBounds(width, depth, position);
        blocks.fill(WATER, innerMin, innerMax, FillOperation.Replace);
    }

    function getMinCornerOfSquare(width: number, depth: number, center: Position) {
        return positions.add(center, pos(-(width / 2), 0, -(depth / 2)));
    }

    function getInnerSquareBounds(width: number, depth: number, center: Position) {
        const innerMin = positions.add(getMinCornerOfSquare(width, depth, center), pos(1, 0, 1));
        const innerMax = positions.add(innerMin, pos(width - 3, 0, depth - 3));
        return [innerMin, innerMax];
    }

    function createEnclosure(width: number, depth: number, position: Position, floorMaterial: number, wallMaterial: number) {
        const startPosition = getMinCornerOfSquare(width, depth, position);
        mmBuilder.teleportTo(startPosition);

        // Build walls
        mmBuilder.teleportTo(startPosition);
        mmBuilder.mark();
        mmBuilder.face(CompassDirection.East) // +X
        mmBuilder.move(SixDirection.Forward, width - 1);
        mmBuilder.fill(wallMaterial)
        
        mmBuilder.mark();
        mmBuilder.face(CompassDirection.South); // +Z
        mmBuilder.move(SixDirection.Forward, depth - 1);
        mmBuilder.line(wallMaterial)

        const farCorner = mmBuilder.position();

        mmBuilder.mark();
        mmBuilder.face(CompassDirection.West) // -X
        mmBuilder.move(SixDirection.Forward, width - 1);
        mmBuilder.line(wallMaterial)

        mmBuilder.mark();
        mmBuilder.face(CompassDirection.North) // -Z
        mmBuilder.move(SixDirection.Forward, depth - 1);
        mmBuilder.line(wallMaterial)

        // Build floor
        mmBuilder.move(SixDirection.Down, 1);
        mmBuilder.mark();
        mmBuilder.teleportTo(farCorner.move(CardinalDirection.Down, 1));
        mmBuilder.fill(floorMaterial, FillOperation.Replace);
    }
}
