"use client";
import { Button } from "@/components/ui/button";
import { Camera, PenLine, Save, Upload, X } from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AnimatePresence, motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const ProfileHeader = () => {
  const [isEditProfileModal, setIsEditProfileModal] = useState(false);
  const [isEditCoverModal, setIsEditCoverModal] = useState(false);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState(null);

  return (
    <div className="relative">
      {/* Cover Section */}
      <div className="relative h-64 md:h-80 bg-gray-300 overflow-hidden">
        <img
          src="/fontend/public/images/logoFB.png"
          alt="cover"
          className="w-full h-full object-cover"
        />
        <Button
          className="absolute bottom-4 right-4 flex items-center"
          variant="secondary"
          size="sm"
          onClick={() => setIsEditCoverModal(true)}
        >
          <Camera className="md:mr-2 h-4 w-4" />
          <span className="hidden md:block">Edit cover photo</span>
        </Button>
      </div>

      {/* Profile Info */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-end md:space-x-5">
          <Avatar className="w-32 h-32 border-4 border-gray-200 dark:border-gray-500">
            <AvatarImage />
            <AvatarFallback className="dark:bg-gray-400">A</AvatarFallback>
          </Avatar>
          <div className="mt-4 md:mt-0 text-center md:text-left flex-grow">
            <h1 className="text-3xl font-bold">Mai Huynh Duong Tuan Kiet</h1>
            <p className="text-gray-400 font-semibold">3.5k friends</p>
          </div>
          <Button
            className="mt-4 md:mt-0 cursor-pointer"
            onClick={() => setIsEditProfileModal(true)}
          >
            <PenLine className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Modal: Edit Cover Photo */}
      <AnimatePresence>
        {isEditCoverModal && (
          <motion.div
            key="cover-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Edit Cover Photo
                </h2>
                <button
                  onClick={() => setIsEditCoverModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-col items-center mb-4">
                {coverPhotoPreview && (
                  <img
                    src=""
                    alt="Cover Photo Preview"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                )}
                <input type="file" accept="image/*" className="hidden" />
                <Button type="button" variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Select New Cover Photo
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal: Edit Profile */}
      <AnimatePresence>
        {isEditProfileModal && (
          <motion.div
            key="profile-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Edit Profile
                </h2>
                <button
                  onClick={() => setIsEditProfileModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <form className="space-y-4">
                <div className="flex flex-col items-center mb-4">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                  <Button type="button" variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Change Profile Photo
                  </Button>
                </div>

                <div>
                  <Label htmlFor="username" className="mb-2">
                    Username
                  </Label>
                  <Input id="username" />
                </div>

                <div>
                  <Label htmlFor="dateOfBirth" className="mb-2">
                    Date of Birth
                  </Label>
                  <Input id="dateOfBirth" type="date" />
                </div>

                <div>
                  <Label htmlFor="gender" className="mb-2">
                    Gender
                  </Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-400 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileHeader;
