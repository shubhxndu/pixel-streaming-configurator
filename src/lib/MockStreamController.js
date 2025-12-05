/**
 * MOCK STREAM CONTROLLER
 * ----------------------
 * Mimics the behavior of the Unreal Engine Pixel Streaming frontend.
 * In production, replace this with the official Epic Games library instance.
 */
export class MockStreamController {
    constructor(logger) {
      this.logger = logger;
      this.logger("System", "Pixel Streaming Wrapper Initialized");
    }
  
    // Simulates emitCommand
    emitCommand(descriptor) {
      this.logger("emitCommand", descriptor);
      // Real impl: this.stream.emitCommand(descriptor);
    }
  
    // Simulates emitConsoleCommand
    emitConsoleCommand(command) {
      this.logger("emitConsoleCommand", `Sending console command: ${command}`);
      // Real impl: this.stream.emitConsoleCommand(command);
    }
  
    // Simulates emitUIInteraction
    emitUIInteraction(descriptor) {
      this.logger("emitUIInteraction", descriptor);
      // Real impl: this.stream.emitUIInteraction(descriptor);
    }
}