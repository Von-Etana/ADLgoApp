import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { MessageSquare, Phone, Mail, HelpCircle, Send } from 'lucide-react-native';
import { COLORS } from '@/lib/constants';
import { useState } from 'react';

export default function SupportScreen() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');

  const supportTopics = [
    'General Inquiry',
    'Payment Issues',
    'Delivery Problems',
    'Account Issues',
    'Technical Support',
    'Partner Support',
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;
    // Handle sending support message
    alert('Support message sent! We will get back to you soon.');
    setMessage('');
    setSelectedTopic('');
  };

  const quickActions = [
    {
      title: 'Chat with Support',
      description: 'Get instant help from our team',
      icon: MessageSquare,
      action: () => alert('Live chat will be available soon'),
    },
    {
      title: 'Call Support',
      description: 'Speak directly with our team',
      icon: Phone,
      action: () => alert('Phone support: +234 123 456 7890'),
    },
    {
      title: 'Email Support',
      description: 'Send us a detailed message',
      icon: Mail,
      action: () => alert('Email: support@adlgo.com'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <Text style={styles.headerSubtitle}>We're here to help you</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsContainer}>
        {quickActions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <TouchableOpacity
              key={index}
              style={styles.quickActionCard}
              onPress={action.action}
            >
              <View style={styles.quickActionIcon}>
                <IconComponent size={24} color={COLORS.primary} />
              </View>
              <View style={styles.quickActionText}>
                <Text style={styles.quickActionTitle}>{action.title}</Text>
                <Text style={styles.quickActionDescription}>{action.description}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Contact Form */}
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Send us a Message</Text>

        <View style={styles.topicSelector}>
          <Text style={styles.topicLabel}>Select Topic</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.topicScroll}>
            {supportTopics.map((topic) => (
              <TouchableOpacity
                key={topic}
                style={[
                  styles.topicChip,
                  selectedTopic === topic && styles.topicChipSelected
                ]}
                onPress={() => setSelectedTopic(topic)}
              >
                <Text style={[
                  styles.topicChipText,
                  selectedTopic === topic && styles.topicChipTextSelected
                ]}>
                  {topic}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.messageInput}>
          <TextInput
            style={styles.textInput}
            placeholder="Describe your issue or question..."
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity
          style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
          onPress={handleSendMessage}
          disabled={!message.trim()}
        >
          <Send size={20} color={COLORS.text.primary} />
          <Text style={styles.sendButtonText}>Send Message</Text>
        </TouchableOpacity>
      </View>

      {/* FAQ Section */}
      <View style={styles.faqContainer}>
        <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
        <View style={styles.faqList}>
          <TouchableOpacity style={styles.faqItem}>
            <Text style={styles.faqQuestion}>How do I track my delivery?</Text>
            <Text style={styles.faqArrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.faqItem}>
            <Text style={styles.faqQuestion}>How do I add money to my wallet?</Text>
            <Text style={styles.faqArrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.faqItem}>
            <Text style={styles.faqQuestion}>How does the bidding system work?</Text>
            <Text style={styles.faqArrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.faqItem}>
            <Text style={styles.faqQuestion}>How do I become a delivery partner?</Text>
            <Text style={styles.faqArrow}>›</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  quickActionsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  quickActionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background.secondary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  quickActionText: {
    flex: 1,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  quickActionDescription: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  formContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  topicSelector: {
    marginBottom: 16,
  },
  topicLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 12,
  },
  topicScroll: {
    flexGrow: 0,
  },
  topicChip: {
    backgroundColor: COLORS.background.secondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  topicChipSelected: {
    backgroundColor: COLORS.primary,
  },
  topicChipText: {
    fontSize: 14,
    color: COLORS.text.primary,
  },
  topicChipTextSelected: {
    color: COLORS.text.primary,
    fontWeight: '600',
  },
  messageInput: {
    marginBottom: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.background.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.text.light,
  },
  sendButtonText: {
    color: COLORS.text.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  faqContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  faqTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  faqList: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: 12,
  },
  faqItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background.border,
  },
  faqQuestion: {
    fontSize: 14,
    color: COLORS.text.primary,
    flex: 1,
  },
  faqArrow: {
    fontSize: 18,
    color: COLORS.text.secondary,
  },
});