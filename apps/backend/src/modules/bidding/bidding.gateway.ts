import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: true })
export class BiddingGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private logger = new Logger('BiddingGateway');

    // Map to track driver locations: driverId -> { lat, lng, socketId }
    private activeDrivers = new Map<string, any>();

    handleConnection(client: Socket) {
        this.logger.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
        // Remove driver from active list if they disconnect
        for (const [driverId, data] of this.activeDrivers.entries()) {
            if (data.socketId === client.id) {
                this.activeDrivers.delete(driverId);
                break;
            }
        }
    }

    // 1. Driver goes online
    @SubscribeMessage('driver_online')
    handleDriverOnline(
        @MessageBody() data: { driverId: string; lat: number; lng: number },
        @ConnectedSocket() client: Socket,
    ) {
        this.activeDrivers.set(data.driverId, { ...data, socketId: client.id });
        this.logger.log(`Driver ${data.driverId} is online at ${data.lat}, ${data.lng}`);
        // Notify nearby users?
    }

    // 2. User creates an order -> Broadcast to drivers
    @SubscribeMessage('create_order')
    handleCreateOrder(@MessageBody() order: any) {
        this.logger.log('New Order Created:', order);
        // In reality, filter by location. Here, broadcast to all 'drivers' room
        this.server.emit('new_request', {
            ...order,
            distance: '2.5km', // Mock distance calculation
        });

        return { status: 'broadcasted', count: this.activeDrivers.size };
    }

    // 3. Driver bids on order
    @SubscribeMessage('driver_bid')
    handleDriverBid(@MessageBody() bid: { orderId: string; driverId: string; amount: number }) {
        this.logger.log(`Driver ${bid.driverId} bid ${bid.amount} on order ${bid.orderId}`);
        // Notify the specific customer
        this.server.emit(`bid_received_${bid.orderId}`, bid);
    }

    // 4. Customer accepts bid
    @SubscribeMessage('accept_bid')
    handleAcceptBid(@MessageBody() data: { orderId: string; bidId: string }) {
        // Notify driver that their bid was accepted
        this.server.emit(`bid_accepted_${data.orderId}`, data);
    }
}
