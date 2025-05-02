"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Card, CardContent } from "components/ui/card";
import { Button } from "components/ui/button";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Zap,
  CreditCard,
} from "lucide-react";
import { useAuth } from "contexts/AuthContext";
import { ChargingSession } from "app/lib/types";
import { getSessionById } from "app/lib/mockData";

const HistoryDetail = () => {
  const [session, setSession] = useState<ChargingSession | null>(null);
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    // Hanya jalankan saat id sudah tersedia dan valid
    if (typeof id === "string") {
      const sessionId = parseInt(id, 10);
      if (!isNaN(sessionId)) {
        const foundSession = getSessionById(sessionId);

        if (foundSession) {
          setSession(foundSession);
        } else {
          router.replace("/history");
        }
      }
    }
  }, [id, router]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !id) {
    return null; // atau bisa tampilkan loading spinner
  }

  if (!session) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  const cost = (session.kWh * 0.35).toFixed(2);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/history")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Charging Details</h1>
      </div>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">{session.station}</h2>
            <p className="text-sm text-muted-foreground flex items-center">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              Location details (if available)
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InfoItem icon={Calendar} label="Date" value={session.date} />
            <InfoItem icon={Clock} label="Duration" value={session.duration} />
            <InfoItem icon={Zap} label="Energy" value={`${session.kWh} kWh`} />
            <InfoItem icon={CreditCard} label="Cost" value={`$${cost}`} />
          </div>

          {session.startTime && session.endTime && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <TimeInfo label="Start Time" value={session.startTime} />
                <TimeInfo label="End Time" value={session.endTime} />
              </div>
            </div>
          )}

          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <h3 className="font-medium mb-2">Charging Summary</h3>
            <div className="space-y-1">
              <SummaryItem
                label="Energy consumed"
                value={`${session.kWh} kWh`}
              />
              <SummaryItem label="Rate per kWh" value="$0.35" />
              <SummaryItem label="Total" value={`$${cost}`} isTotal />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const InfoItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) => (
  <div className="p-3 bg-muted/50 rounded-lg">
    <span className="text-sm text-muted-foreground flex items-center mb-1">
      <Icon className="h-4 w-4 mr-1" /> {label}
    </span>
    <span className="font-medium">{value}</span>
  </div>
);

const TimeInfo = ({ label, value }: { label: string; value: string }) => (
  <div>
    <span className="text-sm text-muted-foreground">{label}</span>
    <p className="font-medium">{value}</p>
  </div>
);

const SummaryItem = ({
  label,
  value,
  isTotal = false,
}: {
  label: string;
  value: string;
  isTotal?: boolean;
}) => (
  <div
    className={`flex justify-between text-sm ${
      isTotal ? "font-medium pt-2 border-t" : ""
    }`}
  >
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

export default HistoryDetail;
