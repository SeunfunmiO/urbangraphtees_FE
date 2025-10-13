import React, { useState } from 'react'

const UserProfile = () => {
  const [saving, setSaving] = useState(false)
  return (
    <div>
      <form className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Username</label>
          <input name="username" className="form-control" />
        </div>
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" />
        </div>
        <div className="col-md-6">
          <label className="form-label">Phone</label>
          <input name="phone" className="form-control" />
        </div>

        <div className="col-12">
          <hr />
          <h6 className="mb-2">Default Shipping Address</h6>
        </div>
        <div className="col-12">
          <label className="form-label">Address Line</label>
          <input name="line1" className="form-control" />
        </div>
        <div className="col-md-6">
          <label className="form-label">City</label>
          <input name="city" className="form-control" />
        </div>
        <div className="col-md-6">
          <label className="form-label">Country</label>
          <input name="country" className="form-control" />
        </div>

        <div className="col-12 d-flex gap-2">
          <button type="submit" className="btn bg-black text-white btn-small" disabled={saving} onClick={setSaving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button type="button" className="btn btn-outline-danger btn-sm">Reset Password</button>
        </div>

      </form>

    </div>
  )
}

export default UserProfile