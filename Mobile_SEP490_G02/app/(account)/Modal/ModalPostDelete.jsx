import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";

const ModalDelete = ({ isVisible, onClose, onDelete, postTitle }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalAttention}>Attention</Text>
          <Text style={styles.modalText}>
            Are you sure you want to delete this post with title "{postTitle}"?
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
              <Text style={styles.buttonDeleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    elevation: 5,
  },
  modalAttention: {
    fontSize: 22,
    color: "#000000",
    fontWeight: "bold",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  deleteButton: {
    backgroundColor: "#F14542",
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  cancelButton: {
    borderColor: "#00A5F5",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
    borderWidth: 1,
  },
  buttonDeleteText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
  buttonCancelText: {
    color: "#0085D4",
    fontSize: 16,
    textAlign: "center",
  },
});

export default ModalDelete;
