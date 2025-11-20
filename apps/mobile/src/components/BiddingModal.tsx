import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { useActiveOrder } from '../store/useActiveOrder';

const { width } = Dimensions.get('window');

interface BiddingModalProps {
    visible: boolean;
    onClose: () => void;
    requestData: {
        id: string;
        pickup: string;
        dropoff: string;
        offerPrice: number;
        distance: string;
    } | null;
    onAccept: (price: number) => void;
    onCounter: (price: number) => void;
}

export const BiddingModal = ({ visible, onClose, requestData, onAccept, onCounter }: BiddingModalProps) => {
    const [counterPrice, setCounterPrice] = useState('');
    const [isCountering, setIsCountering] = useState(false);

    if (!requestData) return null;

    const handleAccept = () => {
        onAccept(requestData.offerPrice);
        onClose();
    };

    const handleSendCounter = () => {
        const price = parseFloat(counterPrice);
        if (price && price > requestData.offerPrice) {
            onCounter(price);
            onClose();
            setIsCountering(false);
            setCounterPrice('');
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.header}>
                        <Text style={styles.title}>New Request! 📦</Text>
                        <Text style={styles.distance}>{requestData.distance} away</Text>
                    </View>

                    <View style={styles.routeContainer}>
                        <View style={styles.routeRow}>
                            <View style={[styles.dot, styles.greenDot]} />
                            <Text style={styles.address} numberOfLines={1}>{requestData.pickup}</Text>
                        </View>
                        <View style={styles.line} />
                        <View style={styles.routeRow}>
                            <View style={[styles.dot, styles.redDot]} />
                            <Text style={styles.address} numberOfLines={1}>{requestData.dropoff}</Text>
                        </View>
                    </View>

                    <View style={styles.priceContainer}>
                        <Text style={styles.priceLabel}>Offer Price</Text>
                        <Text style={styles.priceValue}>₦{requestData.offerPrice.toLocaleString()}</Text>
                    </View>

                    {!isCountering ? (
                        <View style={styles.actionButtons}>
                            <TouchableOpacity style={[styles.button, styles.declineButton]} onPress={onClose}>
                                <Text style={styles.declineText}>Decline</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.button, styles.counterButton]} onPress={() => setIsCountering(true)}>
                                <Text style={styles.counterText}>Counter</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={handleAccept}>
                                <Text style={styles.acceptText}>Accept</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.counterContainer}>
                            <Text style={styles.counterLabel}>Enter your price:</Text>
                            <View style={styles.inputRow}>
                                <Text style={styles.currencyPrefix}>₦</Text>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    value={counterPrice}
                                    onChangeText={setCounterPrice}
                                    placeholder={(requestData.offerPrice + 500).toString()}
                                    autoFocus
                                />
                            </View>
                            <View style={styles.actionButtons}>
                                <TouchableOpacity style={[styles.button, styles.declineButton]} onPress={() => setIsCountering(false)}>
                                    <Text style={styles.declineText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={handleSendCounter}>
                                    <Text style={styles.acceptText}>Send Bid</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        minHeight: 300,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    distance: {
        fontSize: 14,
        color: '#666',
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    routeContainer: {
        marginBottom: 20,
    },
    routeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    greenDot: {
        backgroundColor: '#4CAF50',
    },
    redDot: {
        backgroundColor: '#F44336',
    },
    line: {
        width: 2,
        height: 15,
        backgroundColor: '#E0E0E0',
        marginLeft: 4,
    },
    address: {
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    priceContainer: {
        alignItems: 'center',
        marginBottom: 25,
        backgroundColor: '#F9F9F9',
        padding: 15,
        borderRadius: 12,
    },
    priceLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    priceValue: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2196F3',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    button: {
        flex: 1,
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    declineButton: {
        backgroundColor: '#FFEBEE',
    },
    declineText: {
        color: '#D32F2F',
        fontWeight: '600',
    },
    counterButton: {
        backgroundColor: '#E3F2FD',
    },
    counterText: {
        color: '#1976D2',
        fontWeight: '600',
    },
    acceptButton: {
        backgroundColor: '#4CAF50',
    },
    acceptText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    counterContainer: {
        width: '100%',
    },
    counterLabel: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    currencyPrefix: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginRight: 5,
    },
    input: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        borderBottomWidth: 2,
        borderBottomColor: '#2196F3',
        minWidth: 100,
        textAlign: 'center',
    },
});
