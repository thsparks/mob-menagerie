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
