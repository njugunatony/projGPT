import React from "react";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  price: number;
  features: string[];
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  planName,
  price,
  features,
}) => {
  if (!isOpen) return null;
  return (
    <div className="subscription-modal">
      <div className="modal-content">
        <button className="close" onClick={onClose}>&times;</button>
        <h2>Subscription Details</h2>
        <h3>{planName}</h3>
        <p>Price: ${price}/month</p>
        <ul>
          {features.map((f, i) => <li key={i}>{f}</li>)}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SubscriptionModal;