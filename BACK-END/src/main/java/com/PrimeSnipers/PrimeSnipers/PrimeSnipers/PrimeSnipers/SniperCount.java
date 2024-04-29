package com.PrimeSnipers.PrimeSnipers.PrimeSnipers.PrimeSnipers;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SniperCount {

    private long totalCount;

    private long totalPrepaidCount;

    private long totalPostpaidCount;
}
